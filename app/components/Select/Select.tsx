"use client";
import React, { FC } from "react";
import ReactSelect from "react-select";

interface SelectProps {
  disabled?: boolean;
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options?: any[];
}

const Select: FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className={"z-[100]"}>
      <label className={"block text-sm font-medium leading-6 text-gray-900"}>
        {label}
      </label>
      <div className={"mt-2"}>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          placeholder={"Добавить пользователей"}
          menuPortalTarget={document.body}
          classNames={{
            control: () => "text-sm",
          }}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Select;
