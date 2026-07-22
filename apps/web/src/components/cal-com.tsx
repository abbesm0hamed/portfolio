import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";

const CALCOM_URL = "https://cal.com/abbesm0hamed";

export const CalCom = () => (
  <Button
    nativeButton={false}
    variant="ghost"
    aria-label="Schedule a meeting"
    className="h-full w-control border-r border-r-border text-muted-foreground hover:text-foreground"
    render={<a href={CALCOM_URL} target="_blank" rel="noopener noreferrer" />}
  >
    <Icons.CalendarEvent />
  </Button>
);
