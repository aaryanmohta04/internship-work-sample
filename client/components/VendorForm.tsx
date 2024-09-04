"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import Layout from "@/components/Layout";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Label from "./Label";
const VendorForm = ({ initialData }: any) => {
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialData || {
      name: "",
      methodType: "",
      term: "",
      address1: "",
      address2: "",
      address3: "",
      state: "",
      city: "",
      zip: "",
      country: "",
      status: true,
      contacts: [
        {
          position: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          countryId: "",
        },
      ],
    },
  });

  const router = useRouter();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = async (data: any) => {
    // Add logic to handle form submission
    console.log(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-md rounded-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">Vendor Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                Name
              </Label>
              <InputField
                register={register}
                id="name"
                validation={{ required: true }}
                inputType="text"
              />
            </div>
            <div>
              <Label>
                Method
              </Label>
              <SelectField
                register={register}
                id="methodType"
                validation={{ required: true }}
                data={[
                  { id: "", name: "Select method" },
                  { id: "Net", name: "Net" },
                  { id: "Credit", name: "Credit" },
                  { id: "Cash", name: "Cash" },
                ]}
              />
            </div>
            <div>
              <Label>
                Terms
              </Label>
              <InputField
                register={register}
                id="term"
                validation={{ required: true }}
                inputType="text"
              />
            </div>
            <div>
              <Label>
                Country
              </Label>
              <SelectField
                register={register}
                id="country"
                validation={{ required: true }}
                data={[
                  { id: "", name: "Select country" },
                  { id: "United States", name: "United States" },
                ]}
              />
            </div>
            <div>
              <Label>
                Address 1
              </Label>
              <InputField inputType="text" register={register} id="address1"/>
            </div>
            <div>
              <Label>
                Address 2
              </Label>
              <InputField inputType="text" register={register} id="address2"/>
            </div>
            <div>
              <Label>
                Address 3
              </Label>
              <InputField inputType="text" register={register} id="address3"/>
            </div>
            <div>
              <Label>
                State
              </Label>
              <InputField inputType="text" register={register} id="state"/>
            </div>
            <div>
              <Label>
                City
              </Label>
              <InputField inputType="text" register={register} id="city"/>
            </div>
            <div>
              <Label>
                Zipcode
              </Label>
              <InputField inputType="number" register={register} id="zip"/>
            </div>
            <div className="col-span-2">
              <Label>
                Is Active?
              </Label>
              <input
                type="checkbox"
                {...register("status")}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <Label>
                  Position
                </Label>
                <InputField inputType="text" register={register} id={`contacts.${index}.position`} required={true}/>
              </div>
              <div>
                <Label>
                  Contact First Name
                </Label>
                <InputField inputType="text" register={register} id={`contacts.${index}.firstName`} required={true}/>
              </div>
              <div>
                <Label>
                  Contact Last Name
                </Label>
                <InputField inputType="text" register={register} id={`contacts.${index}.lastName`} required={true}/>
              </div>
              <div>
                <Label>
                  E-mail
                </Label>
                <InputField inputType="text" register={register} id={`contacts.${index}.email`} required={true}/>
              </div>
              <div>
                <Label>
                  Phone #
                </Label>
                <InputField inputType="text" register={register} id={`contacts.${index}.phone`} required={true}/>
              </div>
              <div>
                <Label>
                  Country
                </Label>
                <InputField inputType="text" register={register} id={`contacts.${index}.countryId`} required={true}/>
              </div>
              <div className="col-span-3 text-right">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remove Contact
                </button>
              </div>
            </div>
          ))}
          {fields.length < 5 && (
            <div className="text-right">
              <button
                type="button"
                onClick={() =>
                  append({
                    position: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    countryId: "",
                  })
                }
                className="text-blue-600 hover:text-blue-900"
              >
                + Add Additional Contact
              </button>
            </div>
          )}
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
    </Layout>
  );
};

export default VendorForm;
