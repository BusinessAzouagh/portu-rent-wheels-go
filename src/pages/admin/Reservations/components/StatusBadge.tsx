
interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let bgColor;
  let textColor;
  let statusText;

  switch (status) {
    case "CONFIRMED":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      statusText = "Confirmée";
      break;
    case "CANCELLED":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      statusText = "Annulée";
      break;
    default:
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      statusText = "En attente";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {statusText}
    </span>
  );
};

export default StatusBadge;
