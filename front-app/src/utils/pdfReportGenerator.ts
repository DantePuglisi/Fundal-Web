import jsPDF from 'jspdf';
import type { AcoplamientoResult, FormData } from './acoplamientoCalculator';
import type { CouplingOption } from '../couplingDatabase';

export interface ReportData {
  resultado: AcoplamientoResult;
  formData: FormData;
  applicationName?: string;
  subApplication?: string;
}

export class PDFReportGenerator {
  private doc: jsPDF;
  private yPosition: number = 20;
  private pageHeight: number;
  private pageWidth: number;
  private readonly margin = 20;
  private readonly lineHeight = 8;

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.pageWidth = this.doc.internal.pageSize.width;
  }

  private addNewPageIfNeeded(requiredHeight: number = 20): void {
    if (this.yPosition + requiredHeight > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.yPosition = this.margin;
    }
  }

  private addText(text: string, fontSize: number = 10, fontStyle: string = 'normal', maxWidth?: number): void {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', fontStyle);
    
    if (maxWidth) {
      const lines = this.doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        this.addNewPageIfNeeded();
        this.doc.text(line, this.margin, this.yPosition);
        this.yPosition += this.lineHeight;
      });
    } else {
      this.addNewPageIfNeeded();
      this.doc.text(text, this.margin, this.yPosition);
      this.yPosition += this.lineHeight;
    }
  }

  private addSectionTitle(title: string): void {
    this.yPosition += 5; // Extra space before section
    this.addText(title, 14, 'bold');
    this.yPosition += 3; // Extra space after section title
  }

  private addSubsectionTitle(title: string): void {
    this.yPosition += 3;
    this.addText(title, 12, 'bold');
    this.yPosition += 2;
  }

  private async addImageFromPath(imagePath: string, width: number = 60, height: number = 60): Promise<void> {
    try {
      // Create a temporary image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise((resolve) => {
        img.onload = () => {
          try {
            // Create canvas to convert image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL('image/jpeg', 0.7);
              
              this.addNewPageIfNeeded(height + 10);
              this.doc.addImage(dataURL, 'JPEG', this.margin, this.yPosition, width, height);
              this.yPosition += height + 10;
            }
            resolve();
          } catch (error) {
            console.warn('Error processing image:', error);
            resolve(); // Continue without image
          }
        };
        
        img.onerror = () => {
          console.warn('Could not load image:', imagePath);
          resolve(); // Continue without image
        };
        
        // Convert relative path to absolute path
        const fullPath = imagePath.startsWith('/') ? 
          `${window.location.origin}/Fundal-Web${imagePath}` : 
          imagePath;
        
        img.src = fullPath;
      });
    } catch (error) {
      console.warn('Error adding image:', error);
      // Continue without image
    }
  }

  private addHeader(): void {
    // Company header
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 98, 99); // Teal color
    this.doc.text('FUNDAL TRANSMISIONES', this.margin, this.yPosition);
    
    this.yPosition += 10;
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('INFORME DE SELECCIÓN DE ACOPLAMIENTO', this.margin, this.yPosition);
    
    this.yPosition += 15;
    
    // Add date
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    this.doc.setFontSize(10);
    this.doc.text(`Fecha de generación: ${dateStr}`, this.margin, this.yPosition);
    this.yPosition += 15;
  }

  private addUserSpecifications(formData: FormData, applicationName?: string, subApplication?: string): void {
    this.addSectionTitle('ESPECIFICACIONES DEL EQUIPO');
    
    if (applicationName && subApplication) {
      this.addText(`Aplicación: ${applicationName} - ${subApplication}`, 10, 'normal');
    }
    
    if (formData.especificaciones.name_tag_id) {
      this.addText(`Equipo: ${formData.especificaciones.name_tag_id}`, 10, 'normal');
    }
    
    const powerUnit = formData.especificaciones.hp_or_kw ? 'kW' : 'HP';
    this.addText(`Potencia: ${formData.especificaciones.potencia} ${powerUnit}`, 10, 'normal');
    this.addText(`Velocidad: ${formData.especificaciones.velocidad_rpm} RPM`, 10, 'normal');
    this.addText(`Diámetro Eje Conductor: ${formData.especificaciones.eje_conductor} mm`, 10, 'normal');
    this.addText(`Diámetro Eje Conducido: ${formData.especificaciones.eje_conducido} mm`, 10, 'normal');
    
    if (formData.serviceFactor) {
      this.addText(`Factor de Servicio: ${formData.serviceFactor.toFixed(2)}`, 10, 'normal');
    }
    
    // Additional components
    if (formData.especificaciones.distanciador && formData.distanciador) {
      this.addText(`Distanciador: SÍ (DBSE: ${formData.distanciador.dbse} mm)`, 10, 'normal');
    } else {
      this.addText('Distanciador: NO', 10, 'normal');
    }
    
    this.addText(`Sistema Fusible: ${formData.especificaciones.acople ? 'SÍ' : 'NO'}`, 10, 'normal');
    
    if (formData.especificaciones.reductor && formData.reductor) {
      this.addText('Reductor: SÍ', 10, 'normal');
      this.addText(`  • Relación de Reducción: 1:${formData.reductor.relacion_npm.replace('.', ',')}`, 10, 'normal');
      this.addText(`  • Ø Eje Salida del Reductor: ${formData.reductor.eje_salida} mm`, 10, 'normal');
      this.addText(`  • Ø Eje Conducido del Reductor: ${formData.reductor.eje_conducido} mm`, 10, 'normal');
    } else {
      this.addText('Reductor: NO', 10, 'normal');
    }
  }

  private addCalculationSummary(resultado: AcoplamientoResult): void {
    this.addSectionTitle('RESUMEN DE CÁLCULOS');
    
    this.addText(`Torque Nominal del Equipo: ${resultado.nominalTorqueNm} Nm`, 10, 'normal');
    this.addText(`Torque Requerido (con FS): ${resultado.requiredTorqueNm} Nm`, 10, 'normal');
    this.addText(`RPM de Operación: ${resultado.rpm}`, 10, 'normal');
    this.addText(`Diámetros de Eje: Ø${resultado.conductorDiameter} mm x Ø${resultado.conducidoDiameter} mm`, 10, 'normal');
  }

  private async addCouplingRecommendation(
    title: string, 
    couplingModel: any, 
    factorServicio: number, 
    couplingCode?: string, 
    image?: string,
    description?: string,
    ventajas?: string[]
  ): Promise<void> {
    this.addSubsectionTitle(title);
    
    if (couplingModel) {
      this.addText(`Modelo Recomendado: ${couplingModel.model}`, 11, 'bold');
      if (couplingCode) {
        this.addText(`Código FUNDAL: ${couplingCode}`, 10, 'normal');
      }
      this.addText(`Factor de Servicio Resultante: ${factorServicio.toFixed(2)}`, 10, 'normal');
      this.addText(`Torque Máximo del Acoplamiento: ${couplingModel.torqueNm.toLocaleString()} Nm`, 10, 'normal');
      this.addText(`RPM Máximo: ${couplingModel.maxRPM.toLocaleString()}`, 10, 'normal');
      
      // Add coupling image
      if (image) {
        this.yPosition += 5;
        await this.addImageFromPath(image, 80, 60);
      }
      
      if (description) {
        this.addText('Descripción:', 10, 'bold');
        this.addText(description, 10, 'normal', this.pageWidth - 2 * this.margin);
      }
      
      if (ventajas && ventajas.length > 0) {
        this.addText('Ventajas:', 10, 'bold');
        ventajas.forEach(ventaja => {
          this.addText(`• ${ventaja}`, 10, 'normal', this.pageWidth - 2 * this.margin);
        });
      }
    } else {
      this.addText('No se encontró acoplamiento adecuado', 10, 'normal');
    }
    
    this.yPosition += 5; // Extra space after each coupling
  }

  private addAllOptionsTable(allOptions: CouplingOption[]): void {
    if (allOptions.length === 0) return;
    
    this.addSubsectionTitle('OPCIONES ADICIONALES EVALUADAS');
    
    // Group by series
    const groupedOptions = allOptions.reduce((acc, option) => {
      if (!acc[option.series]) {
        acc[option.series] = [];
      }
      acc[option.series].push(option);
      return acc;
    }, {} as Record<string, CouplingOption[]>);
    
    Object.entries(groupedOptions).forEach(([series, options]) => {
      this.addText(`${series}:`, 10, 'bold');
      
      options.forEach(option => {
        const fsColor = option.factorServicioResultante >= 1.5 ? '(Óptimo)' : 
                       option.factorServicioResultante >= 1.0 ? '(Aceptable)' : '(No recomendado)';
        
        this.addText(`  • ${option.model.model} - FS: ${option.factorServicioResultante.toFixed(2)} ${fsColor}`, 9, 'normal');
        this.addText(`    Torque: ${option.maxTorqueNm.toLocaleString()} Nm | RPM: ${option.maxRPM.toLocaleString()} | Ø: ${option.minShaftDiameter}-${option.maxShaftDiameter} mm`, 8, 'normal');
      });
      this.yPosition += 3;
    });
  }

  private addFooter(): void {
    this.addNewPageIfNeeded(30);
    this.yPosition += 10;
    
    this.addText('NOTAS IMPORTANTES:', 12, 'bold');
    this.addText('• Este informe es una recomendación técnica basada en los parámetros ingresados.', 10, 'normal', this.pageWidth - 2 * this.margin);
    this.addText('• Para aplicaciones críticas, consulte con nuestro departamento técnico.', 10, 'normal', this.pageWidth - 2 * this.margin);
    this.addText('• Los factores de servicio recomendados pueden variar según las condiciones específicas de operación.', 10, 'normal', this.pageWidth - 2 * this.margin);
    
    this.yPosition += 10;
    this.addText('Para más información, contacte a:', 10, 'bold');
    this.addText('Email: ventas@fundaltransmisiones.com.ar', 10, 'normal');
    this.addText('Web: www.fundaltransmisiones.com.ar', 10, 'normal');
    
    // Add page numbers
    const pageCount = (this.doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.text(`Página ${i} de ${pageCount}`, this.pageWidth - 40, this.pageHeight - 10);
    }
  }

  async generateReport(data: ReportData): Promise<void> {
    const { resultado, formData, applicationName, subApplication } = data;
    
    try {
      // Header
      this.addHeader();
      
      // User specifications
      this.addUserSpecifications(formData, applicationName, subApplication);
      
      // Calculation summary
      this.addCalculationSummary(resultado);
      
      // Main recommendation section
      this.addSectionTitle('RECOMENDACIONES DE ACOPLAMIENTO');
      
      if (resultado.secondCoupling) {
        // Dual coupling configuration
        await this.addCouplingRecommendation(
          'ACOPLAMIENTO 1: MOTOR-REDUCTOR',
          resultado.couplingModel,
          resultado.factorServicio,
          resultado.couplingCode,
          resultado.image,
          resultado.description,
          resultado.ventajas
        );
        
        await this.addCouplingRecommendation(
          'ACOPLAMIENTO 2: REDUCTOR-APLICACIÓN',
          resultado.secondCoupling.couplingModel,
          resultado.secondCoupling.factorServicio,
          resultado.secondCoupling.couplingCode,
          resultado.secondCoupling.image,
          resultado.secondCoupling.description,
          resultado.secondCoupling.ventajas
        );
        
        // Add options for both couplings
        if (resultado.allOptions.length > 0) {
          this.addSubsectionTitle('OPCIONES MOTOR-REDUCTOR:');
          this.addAllOptionsTable(resultado.allOptions);
        }
        
        if (resultado.secondCoupling.allOptions && resultado.secondCoupling.allOptions.length > 0) {
          this.addSubsectionTitle('OPCIONES REDUCTOR-APLICACIÓN:');
          this.addAllOptionsTable(resultado.secondCoupling.allOptions);
        }
      } else {
        // Single coupling configuration
        await this.addCouplingRecommendation(
          'ACOPLAMIENTO RECOMENDADO',
          resultado.couplingModel,
          resultado.factorServicio,
          resultado.couplingCode,
          resultado.image,
          resultado.description,
          resultado.ventajas
        );
        
        // Add all options
        if (resultado.allOptions.length > 0) {
          this.addAllOptionsTable(resultado.allOptions);
        }
      }
      
      // Footer
      this.addFooter();
      
    } catch (error) {
      console.error('Error generating PDF report:', error);
      throw error;
    }
  }

  download(filename: string = 'informe-acoplamiento-fundal.pdf'): void {
    this.doc.save(filename);
  }

  getBlob(): Blob {
    return this.doc.output('blob');
  }
}

// Utility function to generate and download report
export async function generateAndDownloadReport(data: ReportData): Promise<void> {
  const generator = new PDFReportGenerator();
  await generator.generateReport(data);
  
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  const filename = `Informe-Acoplamiento-FUNDAL-${timestamp}.pdf`;
  
  generator.download(filename);
}