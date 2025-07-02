'use client'

import Link from "next/link"
import FeatureCard from "../components/Card"
import { useRouter } from 'next/navigation'

export default function Aggrements() {
    const router = useRouter()

    const DataSublease = [
        {
            title: "Договір + Акт - ФОП",
            description: "Основний комплект документів для передачі житла в суборенду від ФОП: договір суборенди та акт передачі.",
            icon: "📄",
            href: "/agreements-now/sublease-fop-dog-act"
        },
        {
            title: "Додаткова угода про припинення - ФОП",
            description: "Юридичний документ для офіційного припинення договору суборенди між ФОП та орендарем.",
            icon: "🚫",
            href: "/agreements-now/sublease-fop-terminate"
        },
        {
            title: "Договір повернення - ФОП",
            description: "Формалізація процедури повернення житла після завершення суборенди з боку ФОП.",
            icon: "↩️",
            href: "/agreements-now/sublease-fop-return-act"
        },
        {
            title: "Договір + Акт - ТОВ",
            description: "Повний набір документів для суборенди житла від юридичної особи (ТОВ): договір та акт передачі.",
            icon: "📄",
            href: "/agreements-now/sublease-tov-dog-act"
        },
        {
            title: "Додаткова угода про припинення - ТОВ",
            description: "Документ для дострокового розірвання суборенди з боку ТОВ згідно з умовами чинного договору.",
            icon: "🚫",
            href: "/agreements-now/sublease-tov-terminate"
        },
        {
            title: "Договір повернення - ТОВ",
            description: "Офіційний документ, що фіксує факт повернення об'єкта суборенди від ТОВ орендодавцю.",
            icon: "↩️",
            href: "/agreements-now/sublease-tov-terminate"
        },
    ]


     const DataRent = [
        {
            title: "Договір + Акт - ТОВ",
            description: "Комплект документів для оренди житлової нерухомості",
            icon: "📄",
            href: "/agreements-now/home-rent"
        },
        {
            title: "Договір припинення - ТОВ",
            description: "Комплект документів для оренди житлової нерухомості",
            icon: "🚫",
            href: "/agreements-now/home-rent"
        },
        {
            title: "Договір повернення - ТОВ",
            description: "Комплект документів для оренди житлової нерухомості",
            icon: "↩️",
            href: "/agreements-now/home-rent"
        },
        {
            title: "Договір + Акт - ФОП",
            description: "Комплект документів для оренди житлової нерухомості",
            icon: "📄",
            href: "/agreements-now/home-rent"
        },
        {
            title: "Договір припинення  - ФОП",
            description: "Комплект документів для оренди житлової нерухомості",
            icon: "🚫",
            href: "/agreements-now/home-rent"
        },
        {
            title: "Договір повернення  - ФОП",
            description: "Комплект документів для оренди житлової нерухомості",
            icon: "↩️",
            href: "/agreements-now/home-rent"
        },
    ]

    return (
        <div>
              <div className="p-4">
            <button
                onClick={ ()=> router.push('/')}
               className="bg-white text-black text-lg px-4 py-2 rounded-2xl shadow-lg m-5 hover:bg-gray-200 transition"
            >
                ← Назад
            </button>

            <div className="text-center text-4xl mb-5">
                    Суборенда
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {Array.from({ length: 3 }, (_, i) => [DataSublease[i], DataSublease[i + 3]])
                .flat()
                .map((item, index) => (
                    <Link href={item.href} key={index} className="block hover:opacity-90 transition">
                        <FeatureCard
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                        />
                    </Link>
            ))}
            </div>
                <div className = "text-center text-4xl mb-5 mt-10">
                    Оренда
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DataRent.map((item, index) => (
                    <Link href={item.href} key={index} className="block hover:opacity-90 transition">
                        <FeatureCard
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                        />
                    </Link>
                ))}
            </div>
        </div>
        </div>
    )
}
