import React, { useState } from 'react';
import { Switch, View, ScrollView } from 'react-native';

import {
  Container,
  Wrapper,
  Permissions,
  PermissionsTitle,
  Separator,
  SwitchSeparator,
  SwitchPermissions,
  SwitchText,
  ConfigButtons,
  ButtonView,
  ButtonText,
  ButtonIcon,
} from './styles.js';

import { MainButton } from '../../components/MainButton';
import { Header } from '../../components/Header';

export default function Setting({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const switches = [
    {
      key: String(Math.random()),
      label: 'Localização',
    },
    {
      key: String(Math.random()),
      label: 'Notificações',
    },
    {
      key: String(Math.random()),
      label: 'E-mail',
    },
  ];

  const buttons = [
    {
      key: String(Math.random()),
      label: 'CONFIGURAR CONTA',
    },
    {
      key: String(Math.random()),
      label: 'CONFIGURAR MAPA',
    },
    {
      key: String(Math.random()),
      label: 'CONFIGURAR PRIVACIDADE',
    },
  ];

  return (
    <Container>
      <ScrollView>
        <Header navigation={navigation} label={'CONFIGURAÇÕES'} />

        <Wrapper>
          <Permissions>
            <PermissionsTitle>Permissões</PermissionsTitle>
            <Separator />
            <SwitchPermissions>
              <SwitchText style={{ fontWeight: 'bold' }}>
                Aceitar todas as permissões
              </SwitchText>
              <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                trackColor={{ false: '#767577', true: '#1167aa' }}
                thumbColor={isEnabled ? '#004b8b' : '#f4f3f4'}
              />
            </SwitchPermissions>
            {switches.map(switchh => (
              <View key={switchh.key}>
                <SwitchSeparator />
                <SwitchPermissions>
                  <SwitchText>{switchh.label}</SwitchText>
                  <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    trackColor={{ false: '#767577', true: '#1167aa' }}
                    thumbColor={isEnabled ? '#004b8b' : '#f4f3f4'}
                  />
                </SwitchPermissions>
              </View>
            ))}
          </Permissions>
        </Wrapper>

        <ConfigButtons>
          {buttons.map(button => (
            <ButtonView key={button.key}>
              <MainButton flag={true}>
                <ButtonText>{button.label}</ButtonText>
                <ButtonIcon name="angle-double-right" />
              </MainButton>
            </ButtonView>
          ))}
        </ConfigButtons>
      </ScrollView>
    </Container>
  );
}
