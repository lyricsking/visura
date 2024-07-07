// app/components/AddressItem.tsx
import React from 'react';

interface AddressItemProps {
  type: 'Home' | 'Office';
  address: string;
  phone: string;
  selected: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ type, address, phone, selected, onEdit, onDelete }) => {
  return (
    <div className={`border p-4 rounded-lg mb-4 ${selected ? 'border-black' : 'border-gray-300'}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <input type="radio" name="address" checked={selected} readOnly className="mr-2" />
          <span className="font-semibold">{type}</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={onEdit} className="text-blue-500">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={onDelete} className="text-red-500">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <p>{address}</p>
      <p className="text-gray-500">Phone no.: {phone}</p>
    </div>
  );
};

export default AddressItem;
