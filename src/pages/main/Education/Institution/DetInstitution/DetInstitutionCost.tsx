import { motion } from "framer-motion";
import {
  IndianRupee,
  Calendar,
  BookOpen,
  Home,
  Utensils,
  Bus,
  FileText,
  Info,
  TrendingUp,
  Wallet,
  GraduationCap
} from "lucide-react";
import type { CostToStudySection } from "@/types/education/type.uniDet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Variants } from "framer-motion";

interface Props {
  cost?: CostToStudySection;
}

// Helper function to get icon based on expense type
const getExpenseIcon = (expenseType: string) => {
  const type = expenseType.toLowerCase();
  if (type.includes('tuition') || type.includes('fee')) return GraduationCap;
  if (type.includes('hostel') || type.includes('accommodation') || type.includes('housing')) return Home;
  if (type.includes('food') || type.includes('meal')) return Utensils;
  if (type.includes('transport') || type.includes('travel')) return Bus;
  if (type.includes('book') || type.includes('material')) return BookOpen;
  if (type.includes('misc') || type.includes('other')) return FileText;
  return Wallet;
};

// Helper function to process HTML content and remove inline color styles
const processHTMLContent = (html: string) => {
  if (!html) return "";
  // Remove inline color styles but keep other formatting
  return html.replace(/color:hsl\([^;]+\);?/gi, '');
};

const DetInstitutionCost = ({ cost }: Props) => {
  if (!cost) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Calculate total annual expenses
  const totalExpenses = cost.costToStudy?.reduce((acc, item) => {
    const amount = parseFloat(item.annualExpenses?.replace(/[^0-9.-]+/g, "") || "0");
    return acc + amount;
  }, 0);

  // Determine if we should use table view (more than 8 items)
  const useTableView = (cost.costToStudy?.length || 0) > 8;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* Header Section with enhanced design */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          {/* Icon and Title */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md" />
              <div className="relative w-16 h-16 flex items-center justify-center bg-linear-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl border border-primary/30 shadow-lg">
                <IndianRupee className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {cost.heading || "Cost to Study"}
            </h2>
          </div>

          {/* Total Cost Badge */}
          {totalExpenses > 0 && (
            <Badge
              variant="outline"
              className="ml-auto px-4 py-2 text-base border-primary/30 bg-primary/5"
            >
              <TrendingUp className="w-4 h-4 mr-2 text-primary" />
              <span className="font-semibold">Total: ₹{totalExpenses.toLocaleString('en-IN')}</span>
              <span className="text-xs text-muted-foreground ml-2">(annual)</span>
            </Badge>
          )}
        </div>

        {/* Description with enhanced styling */}
        {cost.description && (
          <div className="relative max-w-3xl">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary via-primary/50 to-transparent rounded-full" />
            <div
              className="prose prose-lg dark:prose-invert max-w-none pl-6 [&_span]:!text-muted-foreground [&_p]:!text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: processHTMLContent(cost.description)
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Conditional Rendering: Cards or Table */}
      {!useTableView ? (
        /* Cards Grid View - For 8 items or less */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {cost.costToStudy?.map((item) => {
            const IconComponent = getExpenseIcon(item.expenseType);
            const amount = parseFloat(item.annualExpenses?.replace(/[^0-9.-]+/g, "") || "0");

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="relative h-full overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 bg-linear-to-br from-card to-card/50">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <CardContent className="p-6 relative">
                    {/* Header with icon and type */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Amount badge */}
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-0 font-mono"
                      >
                        Annual
                      </Badge>
                    </div>

                    {/* Expense Type */}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.expenseType}
                    </h3>

                    {/* Amount with animation */}
                    <div className="space-y-1 mb-4">
                      <p className="text-3xl font-bold tracking-tight">
                        <span className="text-primary">₹</span>
                        {amount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Estimated annual expense
                      </p>
                    </div>

                    {/* Divider */}
                    <Separator className="my-4 bg-border/50" />

                    {/* Footer with year info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Per academic year</span>
                      </div>
                      <Info className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/40 transition-colors cursor-help" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* Table View - For more than 8 items */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-primary/5">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="w-[50%] py-4 text-base font-semibold">Expense Type</TableHead>
                    <TableHead className="py-4 text-base font-semibold text-right">Annual Expenses (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cost.costToStudy?.map((item, index) => {
                    const amount = parseFloat(item.annualExpenses?.replace(/[^0-9.-]+/g, "") || "0");
                    const IconComponent = getExpenseIcon(item.expenseType);
                    
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group border-border/50 hover:bg-primary/5 transition-colors"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{item.expenseType}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <span className="text-lg font-bold tracking-tight text-primary">
                              ₹{amount.toLocaleString('en-IN')}
                            </span>
                            <Badge variant="outline" className="ml-2 border-primary/20 text-xs">
                              Annual
                            </Badge>
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* View toggle hint */}
          <div className="mt-4 text-center">
            <Badge variant="outline" className="border-primary/20 bg-primary/5">
              Showing {cost.costToStudy?.length} expense items in table view
            </Badge>
          </div>
        </motion.div>
      )}

      {/* Note Section */}
      {cost.note && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 relative"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl" />
          <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Info className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Important Notes
                </h4>
                <div
                  className="text-sm prose prose-sm dark:prose-invert max-w-none [&_span]:!text-muted-foreground [&_p]:!text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: processHTMLContent(cost.note)
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Additional Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-muted-foreground/60">
          * All figures are estimates and may vary based on lifestyle and institution policies
        </p>
      </motion.div>
    </section>
  );
};

export default DetInstitutionCost;