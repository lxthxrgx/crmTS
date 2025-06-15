'use client'
import { useRouter } from 'next/navigation';
import ISubleaseActTov from '@/app/model/ISubleaseActTov';
import { useState } from 'react';
import { formatUkrCurrencyText } from '@/app/components/numberToText';

export default function SubleaseActTov()
{
    const router = useRouter();
    const[data, setData] = useState<ISubleaseActTov>

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const formatDateOnly = (date: string | Date): string =>
        new Date(date).toISOString().split("T")[0];

      const requestBody = {
        data: {
          ...data,
          handoverPeriodDays: parseInt(data.handoverPeriodDays as any),
          rentalPeriodMonths: parseInt(data.rentalPeriodMonths as any),

          rentPaymentDueDay: formatDateOnly(data.rentPaymentDueDay),

          contractStartDate: formatDateOnly(data.contractStartDate),
          contractEndDate: formatDateOnly(data.contractEndDate),
        },
      };
        const res = await fetch('http://localhost:8080/api/private/agreements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (res.ok) {
          alert('Договір успішно збережено!');
        } else {
          alert('Помилка при збереженні.');
        }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;

      setData((prev) => {
        const updated = { ...prev, [name]: value };

        const numericValue = parseFloat(value);

        switch (name) {
          case 'monthlyRentAmount':
            updated.monthlyRentAmount = numericValue;
            updated.monthlyRentText = formatUkrCurrencyText(numericValue);
            break;
          case 'securityDepositAmount':
            updated.securityDepositAmount = numericValue;
            updated.securityDepositText = formatUkrCurrencyText(numericValue);
            break;
          case 'minimumDebtForPenalty':
            updated.minimumDebtForPenalty = numericValue;
            updated.minimumDebtText = formatUkrCurrencyText(numericValue);
            break;
          case 'penaltyAmount':
            updated.penaltyAmount = numericValue;
            updated.penaltyText = formatUkrCurrencyText(numericValue);
            break;
          default:
            break;
        }

        return new Agreement(updated);
      });
    };

    return(
        
         <div className="text-white min-h-screen p-6">
      <button
        className="bg-white text-black text-lg px-4 py-2 rounded-2xl shadow-lg mb-6 hover:bg-gray-200 transition"
        onClick={() => router.push('/agreements-now')}
      >← Назад
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Форма договору суборенди</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            <label className="block">Номер договору</label>
            <input type="text" name="ContractNumber" className="w-full p-3  bg-slate-500 text-black rounded" />

            <label className="block">Дата створення</label>
            <input type="text" name="CreationDate" className="w-full p-3 bg-slate-500 text-black rounded" />

            <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
              <label className="block">ПІП Суборендодавця</label>
              <input type="text" name="PipSublessor" className="w-full p-3 bg-slate-500 text-black rounded" />

              <label className="block">ЄДРПОУ Суборендодавця</label>
              <input type="text" name="rnokppSublessor" className="w-full p-3 bg-slate-500 text-black rounded" />

              <label className="block">Адреса Суборендодавця</label>
              <input type="text" name="addressSublessor" className="w-full p-3 bg-slate-500 text-black rounded" />
            </div>
            
             <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
            <label className="block">ПІП директора</label>
            <input type="text" name="PipDirector" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">ПІП директора (скорочено)</label>
            <input type="text" name="PipsDirector" className="w-full p-3 bg-slate-500 text-black rounded" />

            </div>

            <div className='backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6'>
              <label className="block">Площа приміщення</label>
              <input type="number" name="RoomArea" className="w-full p-3 bg-slate-500 text-black rounded" />

              <label className="block">Площа приміщення (текстом)</label>
              <input type="text" name="RoomAreaText" className="w-full p-3 bg-slate-500 text-black rounded" />

              <label className="block">Адреса приміщення</label>
              <input type="number" name="RoomAreaAddress" className="w-full p-3 bg-slate-500 text-black rounded" />
            </div>

            <label className="block">Номер договору (Предмет договору)</label>
            <input type="text" name="subleaseDopContractNumber" className="w-full p-3  bg-slate-500 text-black rounded" />

            <label className="block">Дата укладання договору</label>
            <input type="text" name="subleaseDopStartDate" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">ПІП Орендодавця</label>
            <input type="text" name="subleaseDopName" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">ЄДРПОУ-РНОКПП Орендодавця</label>
            <input type="text" name="subleaseDopRnokpp" className="w-full p-3 bg-slate-500 text-black rounded" />
            
            <label className="block">Кінцева дата дії договору</label>
            <input type="text" name="StrokDii" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">Строк дії договору</label>
            <input type="text" name="StrokDii" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">Суборендна плата</label>
            <input type="number" name="Pricing" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">Суборендна плата(текстом)</label>
            <input type="text" name="PricingText" className="w-full p-3 bg-slate-500 text-black rounded" />

            <label className="block">Рахунок та назва банку</label>
            <input type="text" name="BanckAccount" className="w-full p-3 bg-slate-500 text-black rounded" />

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
              Зберегти договір
            </button>
          </form>
      </div>
    </div>
    )
}