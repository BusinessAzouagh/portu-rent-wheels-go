
import { Reservation } from "@/types/reservation";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import autoTable from 'jspdf-autotable';

// Extend the jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateInvoice = (reservation: Reservation) => {
  // Calculate rental duration and total price
  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = days * reservation.pricePerDay;
  
  // Create a new PDF document with autotable plugin
  const doc = new jsPDF();
  
  // Add autoTable plugin to jsPDF
  (doc as any).autoTable = autoTable;

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add logo and company details
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text("PORTU RENT", 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("123 Avenue Mohammed V", 20, 30);
  doc.text("Casablanca, Maroc", 20, 35);
  doc.text("Tél: +212 522 123 456", 20, 40);
  doc.text("Email: contact@porturent.ma", 20, 45);
  
  // Add invoice title and details
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text("Facture de location", pageWidth / 2, 60, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(`Numéro de réservation: ${reservation.id}`, 20, 70);
  doc.text(`Date d'émission: ${format(new Date(), "dd MMMM yyyy", { locale: fr })}`, 20, 75);
  
  // Client information
  doc.setFontSize(12);
  doc.text("Informations client", 20, 90);
  doc.line(20, 92, 80, 92);
  
  doc.setFontSize(10);
  doc.text(`Nom complet: ${reservation.customerName}`, 20, 100);
  doc.text(`Téléphone: ${reservation.customerPhone}`, 20, 105);
  if (reservation.email) {
    doc.text(`Email: ${reservation.email}`, 20, 110);
  }
  
  // Rental details
  doc.setFontSize(12);
  doc.text("Détails de location", 20, 125);
  doc.line(20, 127, 80, 127);
  
  doc.setFontSize(10);
  doc.text(`Véhicule: ${reservation.carBrand} ${reservation.carModel}`, 20, 135);
  doc.text(`Date de début: ${format(startDate, "dd MMMM yyyy", { locale: fr })}`, 20, 140);
  doc.text(`Date de fin: ${format(endDate, "dd MMMM yyyy", { locale: fr })}`, 20, 145);
  doc.text(`Nombre de jours: ${days}`, 20, 150);
  
  // Create table for pricing
  const tableData = [
    ["Désignation", "Prix unitaire (DH)", "Quantité", "Total (DH)"],
    [
      `Location ${reservation.carBrand} ${reservation.carModel}`,
      `${reservation.pricePerDay.toFixed(2)}`,
      `${days} jours`,
      `${totalPrice.toFixed(2)}`
    ]
  ];
  
  // Use the autoTable method
  doc.autoTable({
    startY: 160,
    head: [tableData[0]],
    body: [tableData[1]],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { font: 'helvetica', fontSize: 10 },
  });
  
  // Add total
  const finalY = (doc as any).lastAutoTable.finalY || 190;
  doc.text(`Total à payer: ${totalPrice.toFixed(2)} DH`, pageWidth - 40, finalY + 20);
  
  // Footer
  doc.setFontSize(8);
  doc.text("Merci d'avoir choisi Portu Rent pour votre location de véhicule.", pageWidth / 2, 270, { align: "center" });
  doc.text("Ce document est généré automatiquement et ne nécessite pas de signature.", pageWidth / 2, 275, { align: "center" });
  
  // Generate PDF file name
  const firstName = reservation.firstName || reservation.customerName.split(' ')[0];
  const lastName = reservation.lastName || reservation.customerName.split(' ').slice(1).join('_');
  const fileName = `${lastName}_${firstName}_${reservation.carModel}.pdf`;
  
  // Download the PDF
  doc.save(fileName);
};
