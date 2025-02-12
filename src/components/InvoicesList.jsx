import React from 'react';
import { useState } from 'react';

const InvoicesList = ({ items }) => {
    const [selectedItemId, setSelectedItemId] = useState(undefined);
    const [selectedCreditNoteId, setSelectedCreditNoteId] = useState(undefined);

    console.log('received items:', items);

    const handleItemSelect = item => {
        if (selectedItemId === item.id) {
            setSelectedItemId(undefined);
        }
        else {
            setSelectedItemId(item.id);
            console.log('selected item:', selectedItemId);
        }
    };

    const handleCreditNoteSelect = (item) => {
        if (selectedCreditNoteId === item.id) {
            setSelectedCreditNoteId(undefined);
        }
        else {
            setSelectedCreditNoteId(item.id);
            console.log('selected credit note:', selectedCreditNoteId);
        }
        console.log('handle credit note select');
    }

    return (
        <>
            <p>
                <strong>Selecciona una factura</strong>
            </p>
            <div className='flex max-w-4xl mx-auto border rounded shadow-md bg-white'>
                <table className='w-full border-collapse'>
                    <tbody>
                        {items.filter(item => item.type === 'received').map(item => (
                            <tr
                                key={item.id}
                                className={`cursor-pointer rounded transition-all duration-200 ${
                                    selectedItemId === item.id
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleItemSelect(item)}
                            >
                                <td align='center' className='p-2 text-center'>
                                    <input
                                        type="radio"
                                        name="receivedInvoice"
                                        checked={selectedItemId === item.id}
                                        onChange={() => handleItemSelect(item)}
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

            {selectedItemId && items.filter(item => item.reference === selectedItemId).length > 0 ? (
                <>
                    <br></br>
                    <br></br>
                    <br></br>

                    <p>
                        <strong>Selecciona una nota de crédito</strong>
                    </p>

                    <div className='max-w-4xl mx-auto border rounded shadow-md bg-white'>
                        <table className='w-full border-collapse'>
                            <tbody>
                                {items.filter(item => item.reference === selectedItemId).map(item => (
                                    <tr
                                        key={item.id}
                                        className={`cursor-pointer rounded transition-all duration-200 ${
                                            selectedCreditNoteId === item.id
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handleCreditNoteSelect(item)}
                                    >
                                        <td align='center' className='p-2 text-center'>
                                            <input
                                                type="radio"
                                                name="receivedInvoice"
                                                checked={selectedCreditNoteId === item.id}
                                                onChange={() => handleCreditNoteSelect(item)}
                                                className="cursor-pointer p-2"
                                            />
                                        </td>
                                        <td align='left' className='w-1/3 p-2'>{item.id} ({item.organization_id})</td>
                                        <td align='center' className='w-1/3 p-2'>${item.clp} CLP (${item.usd} USD)</td>
                                        <td align='right' className='w-1/3 p-2'>{item.reference}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (<div></div>)}
        </>
    )
}

export default InvoicesList;