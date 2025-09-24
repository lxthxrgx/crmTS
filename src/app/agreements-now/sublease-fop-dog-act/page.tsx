'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatUkrCurrencyText } from '@/app/components/numberToText';
import ISubleaseFopDogAct from '@/app/model/ISubleaseFopDogAct';
import { AreaToText } from '@/app/components/numberToText';
import FloatInput from '@/app/components/FloatInput';
import "../../css/card.css"

export default function SubleaseDogActFop() {
  const router = useRouter();

  const [data, setData] = useState<ISubleaseFopDogAct>({
    NameGroup: '',
    NumberGroup: 0,
    ContractNumber: '',
    CreationDate: "",
    PipSublessor: '',
    PipsSublessor: '',
    rnokppSublessor: '',
    Edruofop:'',
    addressSublessor: '',
    RoomArea: 0,
    RoomAreaText: '',
    RoomAreaAddress: '',
    subleaseDopContractNumber: '',
    subleaseDopStartDate: "",
    subleaseDopName: '',
    subleaseDopRnokpp: '',
    EndContractData: "",
    Pricing: 0,
    PricingText: '',
    BanckAccount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Отправка формы. Текущие данные:', data);
    const formatDateOnly = (date: string | Date): string =>
      new Date(date).toISOString().split("T")[0];

    const requestBody = {
      ...data,
      CreationDate: formatDateOnly(data.CreationDate),
      subleaseDopStartDate: formatDateOnly(data.subleaseDopStartDate),
      StrokDii: formatDateOnly(data.EndContractData)
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API;
      const res = await fetch(`${apiUrl}/api/sublease_fop_dog_act/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      alert(res.ok ? 'Договір успішно збережено!' : 'Помилка при збереженні.');
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Помилка з’єднання з сервером.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => {
      const updated: ISubleaseFopDogAct = { ...prev, [name]: value };

      const numericValue = parseFloat(value);
      const numericValue2 = parseFloat(value);
      switch (name) {
        case 'Pricing':
          updated.Pricing = numericValue;
          updated.PricingText = formatUkrCurrencyText(numericValue);
          break;
        case 'RoomArea':
          updated.RoomArea = numericValue2;
          updated.RoomAreaText = AreaToText(numericValue2);
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));
  };

  return (
    <div className="text-white min-h-screen p-6">
      <button
        className="bg-white text-black text-lg px-4 py-2 rounded-2xl shadow-lg mb-6 hover:bg-gray-200 transition"
        onClick={() => router.push('/agreements-now')}>← Назад</button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Форма договору суборенди та акту (ФОП)</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            
          <div className='card-container'>
        
            <h1 className='text-center'>Загальна інформація</h1>
            <FloatInput label='Номер відділення' id='NumberGroup' value={data.NumberGroup} onChange={handleChange}/>
            <FloatInput label='Найменування відділення' id='NameGroup' value={data.NameGroup} onChange={handleChange}/>
            <FloatInput label='Номер договору' id='ContractNumber' value={data.ContractNumber} onChange={handleChange}/>
            <FloatInput label='Дата створення' id='CreationDate' value={data.CreationDate} onChange={handleDateChange}/>
            <FloatInput label='Кінцева дата дії договору' id='EndContractData' value={data.EndContractData} onChange={handleDateChange}/>
            </div>

          <div className='card-container'>
            <h1 className='text-center'>Суборендодавець</h1>

            <FloatInput id='PipSublessor' label='ПІП' value={data.PipSublessor} onChange={handleChange}/>
            <FloatInput id='PipsSublessor' label='ПІП (скорочено)' value={data.PipsSublessor} onChange={handleChange}/>
            <FloatInput id='rnokppSublessor' label='РНОКПП' value={data.rnokppSublessor} onChange={handleChange}/>
            <FloatInput id='Edruofop' label='ЄДРЮОФОП' value={data.Edruofop} onChange={handleChange}/>
            <FloatInput id='addressSublessor' label='Адреса' value={data.addressSublessor} onChange={handleChange}/>
            <FloatInput id='BanckAccount' label='Рахунок та назва банку' value={data.BanckAccount} onChange={handleChange}/>
          </div>
          
          <div className='card-container'>
            <h1 className='text-center'>Приміщення</h1>
            <FloatInput id='RoomArea' label='Площа' value={data.RoomArea} onChange={handleChange}/>
            <FloatInput id='RoomAreaText' label='Площа (текстом)' value={data.RoomAreaText} onChange={handleChange}/>
            <FloatInput id='RoomAreaAddress' label='Місцезнаходження' value={data.RoomAreaAddress} onChange={handleChange}/>
            <FloatInput id='Pricing' label='Суборендна плата' value={data.Pricing} onChange={handleChange}/>
            <FloatInput id='PricingText' label='Суборендна плата (текстом)' value={data.PricingText} onChange={handleChange}/>
          </div>

          <div className='card-container'>
            <h1 className='text-center'>Приміщення</h1>
            <FloatInput id='subleaseDopContractNumber' label='Номер договору (Предмет договору)' value={data.subleaseDopContractNumber} onChange={handleChange}/>
            <FloatInput id='subleaseDopStartDate' label='Дата укладання договору' value={data.subleaseDopStartDate} onChange={handleChange}/>
          </div>

          <div className='card-container'>
            <h1 className='text-center'>Орендодавець</h1>
            <FloatInput id='subleaseDopName' label='ПІП' value={data.subleaseDopName} onChange={handleChange}/>
            <FloatInput id='subleaseDopRnokpp' label='ЄДРПОУ-РНОКПП' value={data.subleaseDopRnokpp} onChange={handleChange}/>
          </div>

          <button type="submit" className="w-full hover:bg-blue-700 text-black py-3 rounded-lg bg-white"  >
            Зберегти договір
          </button>
        </form>
      </div>
    </div>
  )
}