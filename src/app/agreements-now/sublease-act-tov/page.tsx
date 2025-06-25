'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatUkrCurrencyText } from '@/app/components/numberToText';
import ISubleaseActTov from '@/app/model/ISubleaseActTov';
import { AreaToText } from '@/app/components/numberToText';

export default function SubleaseActTov() {
  const router = useRouter();

  const [data, setData] = useState<ISubleaseActTov>({
    NameGroup: '',
    NumberGroup: 0,
    ContractNumber: '',
    CreationDate: new Date(),
    PipSublessor: '',
    rnokppSublessor: '',
    addressSublessor: '',
    PipDirector: '',
    PipsDirector: '',
    RoomArea: 0,
    RoomAreaText: '',
    RoomAreaAddress: '',
    subleaseDopContractNumber: '',
    subleaseDopStartDate: new Date(),
    subleaseDopName: '',
    subleaseDopRnokpp: '',
    StrokDii: new Date(),
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
      StrokDii: formatDateOnly(data.StrokDii)
    };

    try {
      const res = await fetch('http://localhost:5294/api/Ping/TestTree', {
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
      const updated: ISubleaseActTov = { ...prev, [name]: value };

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
        onClick={() => router.push('/agreements-now')}
      >← Назад</button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Форма договору суборенди</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
            <label className="block">Номер відділення</label>
            <input type="text" name="NumberGroup" value={data.NumberGroup} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Найменування відділення</label>
            <input type="text" name="NameGroup" value={data.NameGroup} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }} />

            <label className="block">Номер договору</label>
            <input type="text" name="ContractNumber" value={data.ContractNumber} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }} />

            <label className="block">Дата створення</label>
            <input type="date" name="CreationDate" value={data.CreationDate.toISOString().substring(0,10)} onChange={handleDateChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Кінцева дата дії договору</label>
            <input type="date" name="StrokDii" value={data.StrokDii.toISOString().substring(0,10)} onChange={handleDateChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
          </div>

          <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
            <h1 className='text-center'>Суборендодавець</h1>
            <label className="block">ПІП</label>
            <input type="text" name="PipSublessor" value={data.PipSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">ЄДРПОУ</label>
            <input type="text" name="rnokppSublessor" value={data.rnokppSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Адреса</label>
            <input type="text" name="addressSublessor" value={data.addressSublessor} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Рахунок та назва банку</label>
            <input type="text" name="BanckAccount" value={data.BanckAccount} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
          </div>

          <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
            <h1 className='text-center'>Директор</h1>
            <label className="block">ПІП</label>
            <input type="text" name="PipDirector" value={data.PipDirector} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">ПІП (скорочено)</label>
            <input type="text" name="PipsDirector" value={data.PipsDirector} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
          </div>
          
          <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
            <h1 className='text-center'>Приміщення</h1>
            <label className="block">Площа</label>
            <input type="number" name="RoomArea" value={data.RoomArea} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Площа (текстом)</label>
            <input type="text" name="RoomAreaText" value={data.RoomAreaText} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Місцезнаходження</label>
            <input type="text" name="RoomAreaAddress" value={data.RoomAreaAddress} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Суборендна плата</label>
            <input type="number" name="Pricing" value={data.Pricing} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">Суборендна плата (текстом)</label>
            <input type="text" name="PricingText" value={data.PricingText} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
          </div>

          <label className="block">Номер договору (Предмет договору)</label>
          <input type="text" name="subleaseDopContractNumber" value={data.subleaseDopContractNumber} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

          <label className="block">Дата укладання договору</label>
          <input type="date" name="subleaseDopStartDate" value={data.subleaseDopStartDate.toISOString().substring(0,10)} onChange={handleDateChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
          
          <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
            <h1 className='text-center'>Орендодавець</h1>
            <label className="block">ПІП</label>
            <input type="text" name="subleaseDopName" value={data.subleaseDopName} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>

            <label className="block">ЄДРПОУ-РНОКПП</label>
            <input type="text" name="subleaseDopRnokpp" value={data.subleaseDopRnokpp} onChange={handleChange} className="w-full p-3 bg-f bg-opacity-50 text-black placeholder-white rounded" style={{ backgroundColor: "#ffffffa8" }}/>
          </div>

          <button type="submit" className="w-full hover:bg-blue-700 text-black py-3 rounded-lg" style={{ backgroundColor: "#ffffffa8" }}>
            Зберегти договір
          </button>
        </form>
      </div>
    </div>
  )
}
