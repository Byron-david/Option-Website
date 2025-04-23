import { defaultLeg, defaultStock } from '../templates/tradeDefaults'

export const generateLegs = (strategy, { symbol = '', date = '' }) => {
    const strategyConfig = strategyOptions.find((opt) => opt.value === strategy);
    const quantity = strategyConfig?.quantity || 0;
  
    const legs = [];
  
    for (let i = 0; i < quantity; i++) {
      let action = 'BUY';
      let trade_type = 'CALL';
      let qty = 1;
  
      if (['Iron Condor', 'Strangle'].includes(strategy) && i < 1) {
        trade_type = 'PUT';
      }
  
      if (strategy === 'Iron Condor' && i < 2) {
        trade_type = 'PUT';
      }
  
      if (strategy === 'Butterfly') {
        if (i === 1) qty = 2;
        if (i === 2) action = 'BUY';
      }
  
      if (strategy === 'Covered Call') {
        action = 'SELL';
      }
  
      if (strategy === 'Strangle') {
        action = 'SELL';
      }
  
      if (i === 1 || i === 2) {
        action = 'SELL';
      }
  
      const leg = generateLeg({ symbol, date, action, trade_type, qty });
      legs.push(leg);
    }
  
    return legs;
  };
  

export function handleStrategyChange(event, setStrategy, setNewTrade) {
  const strategy = event.target.value;
  setStrategy(strategy);

  setNewTrade(prev => ({
    ...prev,
    stock: (strategy === "Stock" || strategy === "Covered Call") ? { ...defaultStock } : {},
    legs: generateLegs(strategy),
  }));
}
