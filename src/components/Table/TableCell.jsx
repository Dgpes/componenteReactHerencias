import { Typography } from "@/components/ui";

export default function TableCell({ children }) {
  return (
    <td className="p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        {children}
      </Typography>
    </td>
  );
}
