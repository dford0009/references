import User from "../entities/User";
import Month from "../types/Month";

type SummaryTable = {
  [displayName: string]: {
    limit: number;
    totalExpenses: number;
    net: number;
    isOverBudget: boolean;
  };
};

function getBudgetSummary(
  user: User,
  month: Month,
  year: number,
): SummaryTable {
  const trackedMonth = user.getTrackedMonthByDate(month, year);
  const summaryTable: SummaryTable = {};
  const budgets = trackedMonth.getBudgets()

  budgets.forEach((budget) => {
    const label = budget.getLabel();
    const id = budget.getId();
    const totalExpenses = budget.getExpenseTotal();
    const limit = budget.getLimit();
    const isOverBudget = budget.getIsOverbudget();
    const displayName = `${label} (${id})`;

    summaryTable[displayName] = {
      limit,
      totalExpenses,
      net: limit - totalExpenses,
      isOverBudget,
    };
  });

  return summaryTable;
}

export default getBudgetSummary;
