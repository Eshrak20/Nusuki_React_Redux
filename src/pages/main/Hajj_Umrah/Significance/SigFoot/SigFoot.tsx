import type { SignificanceFooter } from "@/types/hajj/types.sig";

const SigFoot = ({ footer_title, footer_des }: SignificanceFooter) => {
  return (
    <footer className="lg:mt-16 lg:border-t border-border -mx-4 lg:bg-muted/30 lg:py-12 px-4 lg:px-6 lg:rounded-t-3xl text-center">
      <div className="max-w-7xl mx-auto space-y-3">
        <h4 className="text-xl font-bold text-foreground">{footer_title}</h4>
        <p className="text-sm text-left lg:text-center text-muted-foreground leading-relaxed">
          {footer_des}
        </p>
        <div className="hidden pt-4 lg:flex justify-center gap-4">
          <div className="h-1 w-12 rounded-full bg-hajj" />
        </div>
      </div>
    </footer>
  );
};

export default SigFoot;
