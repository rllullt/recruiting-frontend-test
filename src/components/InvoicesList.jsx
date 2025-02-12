import React from 'react';
import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import green_check from '../assets/green-check.png';

const InvoicesList = ({ items }) => {
    const [selectedItemId, setSelectedItemId] = useState(undefined);
    const [selectedCreditNoteIds, setSelectedCreditNoteIds] = useState([]);

    const [isCreditNoteModalOpen, setIsCreditNoteModalOpen] = useState(false);

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
        if (selectedCreditNoteIds.includes(item.id)) {
            setSelectedCreditNoteIds(selectedCreditNoteIds.filter(it => it.id !== item.id));
        }
        else {
            const ids = selectedCreditNoteIds.filter(() => true);
            ids.push(item.id);
            setSelectedCreditNoteIds(ids);
            console.log('selected credit notes:', selectedCreditNoteIds);
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
                                            selectedCreditNoteIds.includes(item.id)
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handleCreditNoteSelect(item)}
                                    >
                                        <td align='center' className='p-2 text-center'>
                                            <input
                                                type="radio"
                                                name="creditNoteInvoice"
                                                checked={selectedCreditNoteIds.includes(item.id)}
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

                    {selectedCreditNoteIds.length > 0 ? (
                        <>
                            <p>Asignando {selectedCreditNoteIds.length} notas de crédito con monto de ${
                                        items
                                            .filter(item => selectedCreditNoteIds.includes(item.id))
                                            .reduce((memo, item) => memo + item.clp, 0)
                                    } CLP{}</p>
                            <div className='flex items-center justify-center h-screen'>
                                <Button className='bg-blue-500' onClick={() => {setIsCreditNoteModalOpen(true)}}>
                                    Asignar
                                </Button>

                                <Modal
                                    isOpen={isCreditNoteModalOpen}
                                    onClick={() => {
                                        setIsCreditNoteModalOpen(false);
                                        setSelectedItemId(undefined);
                                        selectedCreditNoteIds.forEach(id => {
                                            items = items.filter(item => item.id !== id)
                                        })
                                        setSelectedCreditNoteIds([]);
                                    }}
                                    onClickText='Seguir asignando'
                                >
                                    <div style={{ display: 'grid', placeItems: 'center', textAlign: 'center', padding: '20px' }}>
                                        <img
                                            src={green_check}
                                            style={{
                                                width: 60,
                                            }}
                                            alt='Green ckeck'
                                        />
                                    </div>
                                    <p>Notas de crédito con IDs</p>
                                    <p>‘{selectedCreditNoteIds.join(', ')}’</p>
                                    <p>asignadas correctamente</p>
                                    <p>Monto: ${
                                        items
                                            .filter(item => selectedCreditNoteIds.includes(item.id))
                                            .reduce((memo, item) => memo + item.clp, 0)
                                    } CLP</p>
                                    <p>Facturas involucradas:</p>
                                    <p>{
                                        items.filter(item => selectedCreditNoteIds.includes(item.id))
                                            .map(item => item.reference)
                                            .join(', ')
                                    }</p>
                                </Modal>
                            </div>
                        </>
                    ) : (<div></div>)}
                </>
            ) : (<div></div>)}
        </>
    )
}

export default InvoicesList;