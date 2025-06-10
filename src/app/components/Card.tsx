'use client'
export default function FeatureCard({
    title,
    description,
    icon,
  }: {
    title: string;
    description: string;
    icon: string;
  }) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  }