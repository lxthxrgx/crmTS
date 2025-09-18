'use client'

import Link from "next/link"
import {Card, CardData} from "../components/Card"
import { useRouter } from 'next/navigation'
import "../css/card.css"

export default function Aggrements() {

    const DataSublease:CardData[] = [
        {
            title: "Договір + Акт",
            icon: "📄",
            href: "/agreements-now/sublease-fop-dog-act",
            type: "ФОП"
        },
        {
            title: "Додаткова угода про припинення",
            icon: "🚫",
            href: "/agreements-now/sublease-fop-terminate",
            type: "ФОП"
        },
        {
            title: "Договір повернення",
            icon: "↩️",
            href: "/agreements-now/sublease-fop-return-act",
            type: "ФОП"
        },
        {
            title: "Договір + Акт",
            icon: "📄",
            href: "/agreements-now/sublease-tov-dog-act",
            type: "ТОВ"
        },
        {
            title: "Додаткова угода про припинення",
            icon: "🚫",
            href: "/agreements-now/sublease-tov-terminate",
            type: "ТОВ"
        },
        {
            title: "Договір повернення",
            icon: "↩️",
            href: "/agreements-now/sublease-tov-terminate",
            type: "ТОВ"
        },
    ]


     const DataRent:CardData[] = [
        {
            title: "Договір + Акт",
            icon: "📄",
            href: "/agreements-now/home-rent",
            type: "ТОВ"
        },
        {
            title: "Договір припинення",
            icon: "🚫",
            href: "/agreements-now/home-rent",
            type: "ТОВ"
        },
        {
            title: "Договір повернення",
            icon: "↩️",
            href: "/agreements-now/home-rent",
            type: "ТОВ"
        },
        {
            title: "Договір + Акт",
            icon: "📄",
            href: "/agreements-now/home-rent",
            type: "ФОП"
        },
        {
            title: "Договір припинення",
            icon: "🚫",
            href: "/agreements-now/home-rent",
            type: "ФОП"
        },
        {
            title: "Договір повернення",
            icon: "↩️",
            href: "/agreements-now/home-rent",
            type: "ФОП"
        },
    ]

    const renderCards = (data: CardData[], type: "ФОП" | "ТОВ") => (
        <div className="">
        <h1 className="">{type}</h1>
        <div className="">
            {data
            .filter((item) => item.type === type)
            .map((item, index) => (
                <Link
                href={item.href as string }
                key={index}
                className=""
                >
                <Card title={item.title} icon={item.icon} />
                </Link>
            ))}
        </div>
        </div>
    )
    return (
         <div className="p-4">

            <div className="card-title">
                <h1>Суборенда</h1>

                <div className="card-columns">
                    <div className="card-type">
                    {renderCards(DataSublease, "ФОП")}
                    </div>
                    <div className="card-type">
                    {renderCards(DataSublease, "ТОВ")}
                    </div>
                </div>
            </div>



            <div className="card-title">
                <h1>Оренда</h1>
                <div className="card-columns">
                    <div className="card-type">
                    {renderCards(DataRent, "ФОП")}
                    </div>
                    <div className="card-type">
                    {renderCards(DataRent, "ТОВ")}
                    </div>
                </div>
            </div>
        </div>
    )
}
