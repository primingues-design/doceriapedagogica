import { infantilLudicoConfig } from './configs/infantilLudico';
import { fundamental1Config } from './configs/fundamental1';
import { fundamental2Config } from './configs/fundamental2';
import { ejaAdultoConfig } from './configs/ejaAdulto';
import { neurodivergentConfig } from './configs/neurodivergente';
import type { NomeTemplate } from '../types/pdf.types';
import type { TemplateConfig } from './types/template.types';

export const TEMPLATES: Record<NomeTemplate, TemplateConfig> = {
  infantilLudico: infantilLudicoConfig,
  fundamental1: fundamental1Config,
  fundamental2: fundamental2Config,
  ejaAdulto: ejaAdultoConfig,
  neurodivergente: neurodivergentConfig,
};

export function getTemplateConfig(nome: NomeTemplate): TemplateConfig {
  return TEMPLATES[nome];
}

export const LISTA_TEMPLATES = [
  { id: 'infantilLudico' as NomeTemplate, label: 'Infantil Lúdico', descricao: 'Educação infantil e alfabetização' },
  { id: 'fundamental1' as NomeTemplate, label: 'Fundamental 1', descricao: '1º ao 5º ano' },
  { id: 'fundamental2' as NomeTemplate, label: 'Fundamental 2', descricao: '6º ao 9º ano' },
  { id: 'ejaAdulto' as NomeTemplate, label: 'EJA / Adulto', descricao: 'Educação de jovens e adultos' },
  { id: 'neurodivergente' as NomeTemplate, label: 'Neurodivergente', descricao: 'TEA, TDAH, DI' },
];
