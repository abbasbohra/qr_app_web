import { Routes, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import DeleteAccount from "./pages/DeleteAccount";
import QrViewer from "./pages/QrViewer";
import NotFound from "./pages/NotFound";
import Layout from "./component/Layout";

export default function App() {
  return (
    <Routes>
      {/* QR viewer — full screen, no nav/footer */}
      <Route path="/u/:id" element={<QrViewer />} />

      {/* Everything else → nav + footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
