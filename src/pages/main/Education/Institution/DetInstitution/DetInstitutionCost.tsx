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
  GraduationCap,
  Award,
  CreditCard,
  Landmark,
  Library
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
    <section className="">
      {/* Header Section with Premium Bento Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative p-1 mb-20"
      >
        {/* Modern Background Glows */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          {/* <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-[80px]" /> */}
        </div>

        {/* Top Row: Title & Total Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <IndianRupee className="w-3 h-3" />
              Financial Planning
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              {cost.heading || "Cost to Study"}
            </h2>
          </div>

          {totalExpenses > 0 && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-card/50 backdrop-blur-md border border-border p-4 rounded-3xl shadow-xl flex items-center gap-4 pr-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Est. Annual Total</p>
                <p className="text-3xl font-black text-foreground">₹{totalExpenses.toLocaleString('en-IN')}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Description & Trust Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {cost.description && (
              <div className="relative group">
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed italic">
                  <span className="text-5xl absolute -left-4 -top-4 text-primary/10 font-serif">"</span>
                  <div
                    className="relative z-10"
                    dangerouslySetInnerHTML={{ __html: processHTMLContent(cost.description) }}
                  />
                </div>
              </div>
            )}

            {/* Financial Aids Row */}
            <div className="mt-18 flex flex-wrap gap-3">
              {[
                { icon: Award, label: "Scholarships", sub: "Up to 50%", color: "bg-blue-500" },
                { icon: CreditCard, label: "Easy EMI", sub: "0% Interest", color: "bg-emerald-500" },
                { icon: Landmark, label: "Loans", sub: "Tie-ups", color: "bg-amber-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-secondary/50 border border-border px-4 py-2 rounded-2xl hover:bg-secondary transition-colors cursor-default">
                  <item.icon className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs font-bold leading-none">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The Stats Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Tuition Fee", val: "₹2.5L - 5L", icon: BookOpen, delay: 0.1 },
              { label: "Hostel & Food", val: "₹80k - 1.2L", icon: Home, delay: 0.2 },
              { label: "Transport", val: "₹15k - 25k", icon: Bus, delay: 0.3 },
              { label: "Books & Misc", val: "₹20k - 30k", icon: Library, delay: 0.4 },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.delay }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden bg-card border border-border p-6 rounded-[2rem] transition-all hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <card.icon className="w-20 h-20" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    <p className="text-2xl font-bold tracking-tight mt-1">{card.val}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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


    </section>
  );
};

export default DetInstitutionCost;