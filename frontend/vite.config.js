import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  // server: {
  //   allowedHosts: [
  //     "f84a-2405-201-500c-b0fd-dda7-97dd-c608-ec2d.ngrok-free.app",
  //   ],
  //   port: 5173,
  //   open: true,
  //   host: true,
  // },


});
