import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { Problema } from '../../matematica/generators';

interface Props {
  problemas: Problema[];
  opLabel: string;
  difLabel: string;
  nivel: string;
  data: string;
}

export function PdfMatematicaDoc({ problemas, opLabel, difLabel, nivel, data }: Props) {
  const qty = problemas.length;
  const cols = qty <= 6 ? 2 : qty <= 9 ? 3 : 4;

  const numFontSize = difLabel === 'Difícil' ? 18 : difLabel === 'Médio' ? 20 : 22;
  const signFontSize = numFontSize + 2;
  const cardH = difLabel === 'Difícil' ? 130 : difLabel === 'Médio' ? 112 : 96;

  // Larguras exatas para evitar sobreposição de linhas no grid
  const GAP = 12;
  const contentW = 515; // 595 - 40 - 40
  const cardW = Math.floor((contentW - (cols - 1) * GAP) / cols);

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      paddingTop: 40,
      paddingBottom: 52,
      paddingLeft: 40,
      paddingRight: 40,
    },
    header: {
      borderTopWidth: 4,
      borderTopColor: '#2d6e6e',
      paddingTop: 10,
      marginBottom: 20,
    },
    headerLbl: {
      fontSize: 8, color: '#8a8785', textTransform: 'uppercase',
      letterSpacing: 1, fontFamily: 'Helvetica-Bold', marginBottom: 4,
    },
    headerTitle: {
      fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f0e0c', marginBottom: 3,
    },
    headerMeta: { fontSize: 10, color: '#8a8785', fontFamily: 'Helvetica', marginBottom: 10 },
    nameRow: {
      flexDirection: 'row', gap: 20,
      fontSize: 10, color: '#8a8785', fontFamily: 'Helvetica',
    },
    nameField: { flexDirection: 'row', alignItems: 'center' },
    nameLabel: { fontSize: 10, fontFamily: 'Helvetica', color: '#8a8785', marginRight: 4 },
    nameLine: { width: 110, borderBottomWidth: 1, borderBottomColor: '#cccccc', height: 14 },

    // Grid — sem gap (usamos marginRight/marginBottom nos cards)
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    // Card com largura e altura exatas
    card: {
      width: cardW,
      height: cardH,
      marginRight: GAP,
      marginBottom: GAP,
      backgroundColor: '#faf7f2',
      borderWidth: 1,
      borderColor: '#e0dbd4',
      borderRadius: 7,
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 8,
    },
    cardNum: {
      fontSize: 9, fontFamily: 'Helvetica-Bold',
      color: '#8a8785', marginBottom: 4, letterSpacing: 0.5,
    },
    // Layout da conta em formato vertical
    cardBody: {
      flexDirection: 'column',  // empilha linhas verticalmente
      flex: 1,
    },
    carrySpace: { height: 14 },
    // Cada linha de número ocupa 100% da largura, alinhada à direita
    numLine: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      marginBottom: 3,
    },
    signLine: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      marginBottom: 2,
    },
    opNumber: {
      fontFamily: 'Courier',
      fontSize: numFontSize,
      fontWeight: 'bold',
      color: '#0f0e0c',
      letterSpacing: 1,
    },
    opSign: {
      fontFamily: 'Helvetica-Bold',
      fontSize: signFontSize,
      color: '#2d6e6e',
      marginRight: 4,
      textAlign: 'center',
    },
    opBar: {
      width: '100%',
      borderTopWidth: 2,
      borderTopColor: '#0f0e0c',
      marginTop: 3,
      marginBottom: 6,
    },
    restoLbl: { fontSize: 9, color: '#8a8785', fontFamily: 'Helvetica', marginTop: 2 },
    answerArea: { flex: 1 },

    // Rodapé
    footer: {
      position: 'absolute',
      bottom: 16,
      left: 40, right: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 0.5, borderTopColor: '#cccccc',
      paddingTop: 4,
    },
    footerTxt: { fontSize: 8, color: '#aaaaaa', fontFamily: 'Helvetica' },

    // Gabarito
    gabaHeader: {
      borderTopWidth: 3, borderTopColor: '#d95f3b',
      paddingTop: 12, marginBottom: 14,
    },
    gabaTitulo: {
      fontSize: 15, fontFamily: 'Helvetica-Bold', color: '#d95f3b', marginBottom: 2,
    },
    gabaSub: { fontSize: 10, color: '#8a8785', fontFamily: 'Helvetica' },
    gabaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
    gabaItem: {
      width: '23%',
      flexDirection: 'row',
      paddingVertical: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: '#e0dbd4',
      gap: 4,
    },
    gabaNum: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#8a8785', minWidth: 20 },
    gabaEq: { fontSize: 11, fontFamily: 'Courier', color: '#1a1917' },
  });

  function renderCard(p: Problema, idx: number) {
    const isDiv = p.opKey === 'divisao';
    return (
      <View key={idx} style={styles.card}>
        <Text style={styles.cardNum}>{idx + 1}.</Text>
        <View style={styles.cardBody}>
          <View style={styles.carrySpace} />
          {/* num1 — direita, sem sinal */}
          <View style={styles.numLine}>
            <Text style={styles.opNumber}>{p.num1}</Text>
          </View>
          {/* sinal + num2 — direita */}
          <View style={styles.signLine}>
            <Text style={styles.opSign}>{p.sign}</Text>
            <Text style={styles.opNumber}>{p.num2}</Text>
          </View>
          {/* barra horizontal */}
          <View style={styles.opBar} />
          {isDiv && (p.resto ?? 0) > 0 && (
            <Text style={styles.restoLbl}>Resto: ____</Text>
          )}
          <View style={styles.answerArea} />
        </View>
      </View>
    );
  }

  return (
    <Document>
      {/* Página 1 — Folha do aluno */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerLbl}>DoceriaPedagógica — Folha de Matemática</Text>
          <Text style={styles.headerTitle}>{opLabel} — Nível {difLabel}</Text>
          <Text style={styles.headerMeta}>{nivel} • {qty} questões • {data}</Text>
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Text style={styles.nameLabel}>Nome:</Text>
              <View style={styles.nameLine} />
            </View>
            <View style={styles.nameField}>
              <Text style={styles.nameLabel}>Turma:</Text>
              <View style={[styles.nameLine, { width: 70 }]} />
            </View>
            <View style={styles.nameField}>
              <Text style={styles.nameLabel}>Data:</Text>
              <View style={[styles.nameLine, { width: 80 }]} />
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          {problemas.map((p, i) => renderCard(p, i))}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerTxt}>Doceria Pedagógica</Text>
          <Text style={styles.footerTxt}>Material gerado com qualidade pedagógica</Text>
          <Text style={styles.footerTxt}>{data}</Text>
        </View>
      </Page>

      {/* Página 2 — Gabarito */}
      <Page size="A4" style={styles.page}>
        <View style={styles.gabaHeader}>
          <Text style={styles.gabaTitulo}>Gabarito — Uso Exclusivo do Professor</Text>
          <Text style={styles.gabaSub}>Material gerado por DoceriaPedagógica • {data}</Text>
        </View>
        <View style={styles.gabaGrid}>
          {problemas.map((p, i) => {
            const restoStr = p.opKey === 'divisao' && (p.resto ?? 0) > 0 ? ` (R:${p.resto})` : '';
            return (
              <View key={i} style={styles.gabaItem}>
                <Text style={styles.gabaNum}>{i + 1}.</Text>
                <Text style={styles.gabaEq}>{p.num1}{p.sign}{p.num2}={p.res}{restoStr}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.footer} fixed>
          <Text style={styles.footerTxt}>Doceria Pedagógica</Text>
          <Text style={styles.footerTxt}>Gabarito do professor</Text>
          <Text style={styles.footerTxt}>{data}</Text>
        </View>
      </Page>
    </Document>
  );
}
