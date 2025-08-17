import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className="w-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
