import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

// Pages
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Booking from "@/pages/Booking";
import Success from "@/pages/Success";
import Payment from "@/pages/Payment";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Booking} />
          <Route path="/accueil" component={Home} />
          <Route path="/galerie" component={Gallery} />
          <Route path="/billetterie" component={Booking} />
          <Route path="/paiement" component={Payment} />
          <Route path="/contact" component={Contact} />
          <Route path="/succes" component={Success} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
