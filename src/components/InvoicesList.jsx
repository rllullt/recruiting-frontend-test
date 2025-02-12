import React from 'react';
import { useState } from 'react';

const InvoicesList = ({ items }) => {
    const [selectedId, setSelectedId] = useState(undefined);

    console.log('received items:', items);

    const handleSelect = item => {
        if (selectedId === item.id) {
            setSelectedId(undefined);
        }
        else {
            setSelectedId(item.id);
            console.log('selected item:', selectedId);
        }
    };

    return (
        <>
            <p>
                <strong>Selecciona una factura</strong>
            </p>
            <div className='max-w-4xl mx-auto border rounded shadow-md bg-white'>
                <table className='w-full border-collapse'>
                    <tbody>
                        {items.filter(item => item.type === 'received').map(item => (
                            <tr
                                key={item.id}
                                className={`cursor-pointer rounded transition-all duration-200 ${
                                    selectedId === item.id
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleSelect(item)}
                            >
                                <td align='center' className='p-2 text-center'>
                                    <input
                                        type="radio"
                                        name="receivedInvoice"
                                        checked={selectedId === item.id}
                                        onChange={() => handleSelect(item)}
                                        className="cursor-pointer p-2"
                                    />
                                </td>
                                <td align='left' className='w-1/3 p-2'>{item.id} ({item.organization_id})</td>
                                <td align='center' className='w-1/3 p-2'>${item.clp} CLP (${item.usd} USD)</td>
                                <td align='right' className='w-1/3 p-2'>Recibida</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InvoicesList;