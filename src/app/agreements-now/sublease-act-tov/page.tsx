'use client'
import { useRouter } from 'next/navigation';

export default function SubleaseActTov()
{
    const router = useRouter();
    return(
        
         <div className="text-white min-h-screen p-6">
      <button
        className="bg-white text-black text-lg px-4 py-2 rounded-2xl shadow-lg mb-6 hover:bg-gray-200 transition"
        onClick={() => router.push('/agreements-now')}
      >← Назад
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Форма договору оренди</h1>
        <form  className="space-y-4">

              <select
        name="idLessor"
        className="w-full p-3 bg-zinc-800 rounded"
      >
        <option value="">Оберіть орендодавця</option>
      </select>

      <select
        name="idTenant"

        className="w-full p-3 bg-zinc-800 rounded"
      >
        <option value="">Оберіть орендаря</option>
      </select>

          {/* Block 1.8 */}
          <input type="text" name="capitalRepairResponsible" placeholder="Капітальний ремонт - хто відповідає"   className="w-full p-3 bg-zinc-800 rounded" />
          <input type="text" name="currentRepairResponsible" placeholder="Поточний ремонт - хто відповідає"  className="w-full p-3 bg-zinc-800 rounded" />

          {/* Block 3.1 & 4.1 */}
          <input type="number" name="handoverPeriodDays" placeholder="Термін передачі житла (днів)"  className="w-full p-3 bg-zinc-800 rounded" />
          <input type="number" name="rentalPeriodMonths" placeholder="Період оренди (місяців)"  className="w-full p-3 bg-zinc-800 rounded" />

          {/* Block 5.1 - 5.4 */}
          <input type="number" name="monthlyRentAmount" placeholder="Місячна сума оренди"  className="w-full p-3 bg-zinc-800 rounded" />
          <input type="text" name="monthlyRentText" placeholder="Текст до суми оренди" className="w-full p-3 bg-zinc-800 rounded" />
                    <label className="block">Крайній день оплати оренди</label>
          <input type="date" name="rentPaymentDueDay"  className="w-full p-3 bg-zinc-800 rounded" />
          <input type="number" name="securityDepositAmount" placeholder="Сума застави" className="w-full p-3 bg-zinc-800 rounded" />
          <input type="text" name="securityDepositText" placeholder="Текст до застави" className="w-full p-3 bg-zinc-800 rounded" />

          {/* Block 8.2 */}
          <input type="number" name="minimumDebtForPenalty" placeholder="Мін. борг для штрафу" className="w-full p-3 bg-zinc-800 rounded" />
          <input type="text" name="minimumDebtText" placeholder="Текст до мінімального боргу" className="w-full p-3 bg-zinc-800 rounded" />
          <input type="number" name="penaltyAmount" placeholder="Сума штрафу" className="w-full p-3 bg-zinc-800 rounded" />
          <input type="text" name="penaltyText" placeholder="Текст до штрафу" className="w-full p-3 bg-zinc-800 rounded" />

          {/* Block 10.3 */}
          <label className="block">Дата початку договору</label>
          <input type="date" name="contractStartDate" className="w-full p-3 bg-zinc-800 rounded" />
          <label className="block">Дата завершення договору</label>
          <input type="date" name="contractEndDate" className="w-full p-3 bg-zinc-800 rounded" />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            Зберегти договір
          </button>
        </form>
      </div>
    </div>
    )
}