import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import mapStyle from './mapconfig';

const museusURL = 'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=97ab18da-f940-43b1-b0d4-a9e93e90bed5&limit=5';

export default function App() {
  const [nome, setNome] = useState('Dario');
  const [museus, setMuseus] = useState([]);
  const [cor] = useState('#2b4f60');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function reqMuseus(){
      const response = await fetch(museusURL);
      const data = await response.json();
      setMuseus(data.result.records);
      setLoading(false);
    } 
    reqMuseus();
  }, []);

  const mapMarkers = () => {
    return museus.map((museu) => <Marker
    key = {museu.id}
    pinColor = {cor}
    coordinate={{latitude: museu.latitude, longitude: museu.longitude}}
    title = {museu.nome}
    description = {museu.descricao}
    >
    </Marker>)  
  }



  if(isLoading){
    return (
      <View style={styles.background}>
        <Text style={styles.loading}>Carregando...</Text>   
      </View>
    )
  }else{
    return (
      <View style={styles.background}>
        <Text style={styles.title}>Olá, {nome}!</Text>
        <View style={styles.container}>
          <MapView initialRegion={{
            latitude: -8.0548874,
            longitude: -34.8885838,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
            customMapStyle={mapStyle}
            style={styles.map}>
            { mapMarkers() }
          </MapView>
        </View>
      </View>
    );
  }
  }
  

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#bdc7c9',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 320,
    height: 550,
    marginTop: 30
  },
  title: {
    color: '#2b4f60',
    fontSize: 26,
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 20
  },
  loading: {
    fontSize: 20
  },
});