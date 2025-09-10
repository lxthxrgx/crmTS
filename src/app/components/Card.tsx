'use client'
import "../css/card.css"

export interface CardData{
  title: string
  icon: string
  href?: string
  type: string
}

export interface CardProps{
  icon: string
  title: string
}

export function Card(card_data: CardProps) {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">{card_data.icon}</div>
      <h3 className="feature-card-title">{card_data.title}</h3>
    </div>
  );
}
