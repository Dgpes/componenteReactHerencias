import { Typography } from "@/components/ui";

export default function TableHeadCell({ children }) {
  return (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal leading-none opacity-70"
      >
        {children}
      </Typography>
    </th>
  );
}
