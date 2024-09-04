import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { fetchStores } from "@/lib/api/Store";
import { fetchRoles } from "@/lib/api/Role";
import { fetchAccountTypes } from "@/lib/api/AccountType";
import { User } from "@/lib/type/User";
import { Role } from "@/lib/type/Role";
import { fetchCountries } from "@/lib/api/Country";
import SelectMultiField from "./SelectMultiField";

interface UserFormProps {
  user?: User;
  onSave: (data: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave }) => {
  const { register, handleSubmit, setValue, reset } = useForm<User>();
  const [stores, setStores] = useState<Store[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [isActive, setIsActive] = useState(
    user?.status == "active" ? true : false
  );
  const [countryCode, setCountryCode] = useState<number | string>("");
  const [countries, setCountries] = useState([]);
  const [permissions, setPermissions] = useState<any>(
    user?.userRoles?.map((roleObj) => ({
      value: roleObj.role.id,
      label: roleObj.role.name,
    }))
  );
  const [userStores, setUserStores] = useState<any>(
    user?.userStores?.map((storeObj) => ({
      value: storeObj.store.id,
      label: storeObj.store.name,
    }))
  );

  const fetchCountriesData = async () => {
    const data = await fetchCountries();
    setCountries(data);
  };

  const router = useRouter();

  useEffect(() => {
    fetchCountriesData();
    fetchStoresData();
    fetchRolesData();
    fetchAccountTypesData();

    if (user) {
      reset(user);
      setIsActive(user.status == "active" ? true : false);
      setPermissions(
        user?.userRoles?.map((roleObj) => ({
          value: roleObj.role.id,
          label: roleObj.role.name,
        }))
      );
      setUserStores((
        user?.userStores?.map((storeObj) => ({
          value: storeObj.store.id,
          label: storeObj.store.name,
        }))
      ))
      setCountryCode(user.countryCode);
    }
  }, [user]);

  useEffect(()=> {
    console.log(stores);
    console.log(roles); 
  }, [stores, roles])

  const fetchStoresData = async () => {
    const params = new URLSearchParams({
      offset: String(0),
      limit: String(0),
    });
    const data = await fetchStores(params);
    setStores(data.data);
  };

  const fetchRolesData = async () => {
    const params = new URLSearchParams({
      offset: String(0),
      limit: String(0),
    });
    const data = await fetchRoles(params);
    setRoles(data.data);
  };

  const fetchAccountTypesData = async () => {
    const data = await fetchAccountTypes();
    setAccountTypes(data);
  };

  const onSubmit = (data: User) => {
    data.status = isActive ? "active" : "inactive";
    data.userRoles = permissions?.map(
      (role: { value: number; label: string }) => ({
        userId: user?.id,
        roleId: role.value,
        // role: { id: role.value, name: role.label },
      })
    );
    data.userStores = userStores?.map(
      (store: { value: number; label: string }) => ({
        userId: user?.id,
        storeId: store.value,
        // store: { id: store.value, name: store.label },
      })
    );
    console.log(data);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <div className="flex flex-row w-full space-x-2">
          <div>
            <label
              htmlFor="countryCode"
              className="block text-sm font-medium text-gray-700"
            >
              Country Code
            </label>
            <select
              id="countryCode"
              {...register("countryCode", { required: true })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-48"
              defaultValue={countryCode}
            >
              <option value="">Select country code</option>
              {countries.map((country: any) => (
                <option key={country.id} value={country.id}>
                  {country.phonecode} ({country.name})
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="contact"
              type="text"
              {...register("mobileNumber", { required: true })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="store"
          className="block text-sm font-medium text-gray-700"
        >
          Warehouse (Store)
        </label>
        <SelectMultiField
          id="userStores"
          data={stores}
          onChange={setUserStores}
          value={userStores}
          required={true}
        />
        {/* <select
          id="store"
          {...register("store.id", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select Store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select> */}
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Permission Level
        </label>
        <SelectMultiField
          id="userRoles"
          data={roles}
          onChange={setPermissions}
          value={permissions}
          required={true}
        />
        {/* <select
          id="role"
          {...register("userRoles", { required: true })}
          onChange={(e) => {
            setPermissions(Number(e.target.value));
          }}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select Permission Level</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select> */}
      </div>
      <div className="mb-4">
        <label
          htmlFor="accountType"
          className="block text-sm font-medium text-gray-700"
        >
          Account Type
        </label>
        <select
          id="accountType"
          {...register("accountType.id", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select Account Type</option>
          {accountTypes.map((accountType) => (
            <option key={accountType.id} value={accountType.id}>
              {accountType.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 flex items-center">
        <label
          htmlFor="isActive"
          className="block text-sm font-medium text-gray-700 mr-2"
        >
          Is Active?
        </label>
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-gray"
        >
          CANCEL
        </button>
        <button type="submit" className="btn btn-blue">
          SAVE
        </button>
      </div>
    </form>
  );
};

export default UserForm;
