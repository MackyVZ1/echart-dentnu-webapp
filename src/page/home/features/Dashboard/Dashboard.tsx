import Flex from "@/components/Flex";
import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
  }, []);
  return <Flex>Dashboard</Flex>;
}

export default Dashboard;
