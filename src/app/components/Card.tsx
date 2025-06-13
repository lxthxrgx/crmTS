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
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  }