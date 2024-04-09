import React from 'react';

const MenuButton = ({title, onClick}) => {
    return (
        <div
            className="flex items-center justify-center space-x-5 bg-gray-100 rounded-md my-4 cursor-pointer"
            onClick={() => onClick()}
        >
            <span className="select-none text-gray-900 text-2xl my-2 font-semibold">{title}</span>
        </div>
    );
};

export default MenuButton;