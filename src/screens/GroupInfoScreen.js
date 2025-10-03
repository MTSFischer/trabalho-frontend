import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const groupMembers = [
  { name: 'Gabriel Henrique Gemelli', ra: '1134947' },
  { name: 'Matias Fischer', ra: '7138422' },
  { name: 'Fabricio Biasi Brunetto', ra: '1135495' },
  { name: 'Gustavo Lopes De Melo', ra: '1134429' }
];

export default function GroupInfoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Informações do Grupo</Text>
        <Text style={styles.subtitle}>
          Este aplicativo foi desenvolvido como trabalho prático da disciplina de Desenvolvimento Mobile.
        </Text>

        <View style={styles.membersContainer}>
          {groupMembers.map((member) => (
            <View key={member.ra} style={styles.memberCard}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRa}>RA: {member.ra}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          Substitua os dados acima pelos nomes e RAs oficiais da equipe antes da entrega final.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
  },
  membersContainer: {
    gap: 12,
  },
  memberCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  memberRa: {
    marginTop: 4,
    color: '#4b5563',
  },
  note: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});