import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { EmailLink } from '~/components/links/links-component';

export const TextTerm = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
          Termos de Utilização do Aplicativo Jornada Pulmonar
        </Text>
        <Text>
          Bem-vindo ao nosso aplicativo Jornada Pulmonar! Antes de prosseguir, por favor, leia
          atentamente e aceite os seguintes termos de utilização:
        </Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
          Cadastro de Usuário:
        </Text>
        <Text>
          Para utilizar todas as funcionalidades do aplicativo, será necessário realizar um
          cadastro. Durante o cadastro, solicitaremos informações como seu nome, endereço de e-mail,
          imagem de perfil e uma senha segura.
        </Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
          Perfil de Professor:
        </Text>
        <Text>
          Se você deseja contribuir com perguntas e cenários para estudo, poderá criar um perfil de
          professor. Isso permitirá que você elabore questões relevantes sobre ausculta pulmonar e
          crie cenários que simulem situações do cotidiano na área da saúde.
        </Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
          Perfil de Aluno:
        </Text>
        <Text>
          Caso seu objetivo seja responder perguntas elaboradas por professores e interagir com os
          cenários simulados, você pode criar um perfil de aluno. Isso lhe dará acesso às atividades
          de aprendizagem disponíveis no aplicativo.
        </Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
          Ranking de Desempenho:
        </Text>
        <Text>
          Para incentivar a participação e o aprendizado, o aplicativo apresentará um ranking dos
          usuários que mais acertarem as questões e cenários propostos. Este ranking será atualizado
          regularmente e servirá como uma medida de desempenho dentro da comunidade de estudantes e
          professores.
        </Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
          Propósito Educacional:
        </Text>
        <Text>
          Este aplicativo é projetado com o propósito de auxiliar estudantes e profissionais da área
          da saúde a aprimorarem seus conhecimentos em ausculta pulmonar. Os cenários apresentados
          são simulados e não devem substituir a prática clínica supervisionada por profissionais
          qualificados.
        </Text>
        <Text style={{ marginTop: 10 }}>
          Ao prosseguir com o cadastro e utilização do aplicativo, você concorda em cumprir estes
          termos de utilização. Se tiver alguma dúvida ou preocupação, entre em contato conosco
          através do <EmailLink email="pjsv.mep22@uea.edu.br" />
        </Text>
        <Text style={{ marginTop: 10 }}>
          Obrigado por escolher nosso aplicativo de ausculta pulmonar. Esperamos que esta ferramenta
          seja útil em sua jornada de aprendizado na área da saúde!
        </Text>
      </View>
    </ScrollView>
  );
};
