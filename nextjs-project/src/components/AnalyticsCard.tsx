import { Card } from "./ui/card";
import { Icons, IconName } from "./icons";
import { motion } from "motion/react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: IconName;
  gradient?: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  gradient = 'from-primary-700 to-primary-900'
}: AnalyticsCardProps) {
  const Icon = Icons[icon];
  
  const changeColors = {
    positive: 'text-status-success',
    negative: 'text-status-error',
    neutral: 'text-text-secondary'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 hover:shadow-2xl transition-all duration-300 border border-border-light bg-white">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-text-secondary">{title}</p>
            <h2 className="text-text-primary">{value}</h2>
            {change && (
              <div className="flex items-center gap-2">
                {changeType === 'positive' && <Icons.trendingUp className="w-4 h-4 text-status-success" />}
                {changeType === 'negative' && <Icons.trendingUp className="w-4 h-4 text-status-error rotate-180" />}
                <span className={changeColors[changeType]}>{change}</span>
              </div>
            )}
          </div>
          
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-secondary-500" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}