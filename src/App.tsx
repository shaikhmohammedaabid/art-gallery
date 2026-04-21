import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteSkeleton from "@/components/RouteSkeleton";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavouritesProvider } from "@/hooks/FavouritesContext.tsx";
import NotFound from "./pages/NotFound.tsx";

const Index = lazy(() => import("./pages/Index.tsx"));
const ArtworkDetail = lazy(() => import("./pages/ArtworkDetail.tsx"));
const ExhibitionDetail = lazy(() => import("./pages/ExhibitionDetail.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const OtpVerify = lazy(() => import("./pages/OtpVerify.tsx"));
const Explore = lazy(() => import("./pages/Explore.tsx"));
const Favourites = lazy(() => import("./pages/Favourites.tsx"));
const Collections = lazy(() => import("./pages/Collections.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FavouritesProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/otp" element={<OtpVerify />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:id" element={<Collections />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/exhibitions/:id" element={<ExhibitionDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FavouritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
