import React from 'react'

interface FAQSidebarProps {
  selectedDataset: string
}

const datasetPrompts = {
  CustomerExperience: [
    "What is the average customer satisfaction score?",
    "Show me the distribution of customer ratings",
    "Which factors have the strongest correlation with customer satisfaction?",
    "What is the trend of customer complaints over time?",
    "Compare satisfaction scores across different regions"
  ],
  SuccessEducationBackground: [
    "What is the most common educational background among successful individuals?",
    "Show the relationship between education level and success metrics",
    "What percentage of successful people have advanced degrees?",
    "Compare success rates across different fields of study",
    "What is the average years of education for successful individuals?"
  ],
  PokemonData: [
    "Which Pokemon has the highest base stats?",
    "Show the distribution of Pokemon types",
    "What is the win rate for each Pokemon type?",
    "Compare legendary vs non-legendary Pokemon battle performance",
    "What are the most effective type combinations?"
  ]
}

export const FAQSidebar: React.FC<FAQSidebarProps> = ({ selectedDataset }) => {
  const prompts = datasetPrompts[selectedDataset as keyof typeof datasetPrompts] || []

  return (
    <div className="w-64 bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Example Prompts</h3>
      <ul className="space-y-2">
        {prompts.map((prompt, index) => (
          <li
            key={index}
            className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => {
              // You can implement a callback to set the prompt in the chat input
              console.log('Selected prompt:', prompt)
            }}
          >
            {prompt}
          </li>
        ))}
      </ul>
    </div>
  )
} 