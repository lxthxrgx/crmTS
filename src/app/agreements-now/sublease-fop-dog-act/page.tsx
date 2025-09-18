'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatUkrCurrencyText } from '@/app/components/numberToText';
import ISubleaseFopDogAct from '@/app/model/ISubleaseFopDogAct';
import { AreaToText } from '@/app/components/numberToText';
import "./page.css"
import "../../css/card.css"
import "../../css/input.css"

export default function SubleaseDogActFop() {
  const router = useRouter();

  const [data, setData] = useState<ISubleaseFopDogAct>({
    NameGroup: '',
    NumberGroup: 0,
    ContractNumber: '',
    CreationDate: new Date(),
    PipSublessor: '',
    PipsSublessor: '',
    rnokppSublessor: '',
    Edruofop:'',
    addressSublessor: '',
    RoomArea: 0,
    RoomAreaText: '',
    RoomAreaAddress: '',
    subleaseDopContractNumber: '',
    subleaseDopStartDate: new Date(),
    subleaseDopName: '',
    subleaseDopRnokpp: '',
    EndContractData: new Date(),
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
      <div className="grid-container">
        <div className="feature-card-form">
            <input type="text" name="NumberGroup" className='input' placeholder='Номер відділення' value={data.NumberGroup} onChange={handleChange} />
            <input type="text" name="NameGroup" className='input' placeholder='Найменування відділення' value={data.NameGroup} onChange={handleChange} />
            <input type="text" name="ContractNumber" className='input' placeholder='Номер договору' value={data.ContractNumber} onChange={handleChange} />
            <input type="date" name="CreationDate" className='input' placeholder='Дата створення' value={data.CreationDate.toISOString().substring(0,10)} onChange={handleDateChange}/>
            <input type="date" name="EndContractData" className='input' placeholder='Кінцева дата дії договору' value={data.EndContractData.toISOString().substring(0,10)} onChange={handleDateChange}/>      
        </div>

        <div className="feature-card-form">
          <h1 className='text-center'>Суборендодавець</h1>
            <input type="text" name="PipSublessor" placeholder='ПІП' value={data.PipSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
            <input type="text" name="PipsSublessor" placeholder='ПІП (скорочено)' value={data.PipsSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
            <input type="text" name="rnokppSublessor" placeholder='РНОКПП' value={data.rnokppSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
            <input type="text" name="Edruofop" placeholder='ЄДРЮОФОП' value={data.Edruofop} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
            <input type="text" name="addressSublessor" placeholder='Адреса' value={data.addressSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
            <input type="text" name="BanckAccount" placeholder='Рахунок та назва банку' value={data.BanckAccount} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>       
        </div>

      <div className="feature-card-form">
        <h1 className='text-center'>Приміщення</h1>
        <input type="number" name="RoomArea" placeholder='Площа' value={data.RoomArea} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
        <input type="text" name="RoomAreaText" placeholder='Площа (текстом)' value={data.RoomAreaText} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
        <input type="text" name="RoomAreaAddress" placeholder='Місцезнаходження' value={data.RoomAreaAddress} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
        <input type="number" name="Pricing" placeholder='Суборендна плата' value={data.Pricing} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
        <input type="text" name="PricingText" placeholder='Суборендна плата (текстом)' value={data.PricingText} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>       
      </div>

      <div className="feature-card-form">
        <input type="text" name="subleaseDopContractNumber" placeholder='Номер договору (Предмет договору)' value={data.subleaseDopContractNumber} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
        <input type="date" name="subleaseDopStartDate" placeholder='Дата укладання договору' value={data.subleaseDopStartDate.toISOString().substring(0,10)} onChange={handleDateChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
      </div>

      <div className="feature-card-form">
        <h1 className='text-center'>Орендодавець</h1>
        <input type="text" name="subleaseDopName" placeholder='ПІП' value={data.subleaseDopName} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

        <input type="text" name="subleaseDopRnokpp" placeholder='ЄДРПОУ-РНОКПП' value={data.subleaseDopRnokpp} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>   
      </div>
    </div>
  )
}
