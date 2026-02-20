import type { SignificanceFooter } from "@/types/hajj/types.sig";

const SigFoot = ({ footer_title, footer_des }: SignificanceFooter) => {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30 py-12 px-6 rounded-t-3xl text-center">
      <div className="max-w-7xl mx-auto space-y-3">
        <h4 className="text-xl font-bold text-foreground">{footer_title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {footer_des}
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <div className="h-1 w-12 rounded-full bg-hajj" />
        </div>
      </div>
    </footer>
  );
};

export default SigFoot;
