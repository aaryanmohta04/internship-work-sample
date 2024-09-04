
import { useState } from "react";
import InputField from "./InputField";
import Label from "./Label";
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  mobile: string;
  password?: string;
  currentPassword?: string;
  confirmPassword?: string;
};

type ProfileFormProps = {
  initialData: User;
  onSubmit: (data: Partial<User>) => void;
};

export default function ProfileForm({
  initialData,
  onSubmit,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>
          First Name
        </Label>
        <InputField
          inputType="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Last Name
        </Label>
        <InputField
          inputType="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          E-mail
        </Label>
        <InputField
          inputType="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Username
        </Label>
        <InputField
          inputType="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Mobile
        </Label>
        <InputField
          inputType="text"
          id="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Current Password
        </Label>
        <InputField
          inputType="password"
          id="currentPassword"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>
          New Password
        </Label>
        <InputField
          inputType="password"
          id="password"
          // value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>
          Confirm Password
        </Label>
        <InputField
          inputType="password"
          id="confirmPassword"
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
