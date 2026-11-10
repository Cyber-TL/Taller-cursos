import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [estudiante, setEstudiante] = useState('');
  const [curso, setCurso] = useState('');
  const [cupos, setCupos] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState(''); 
  const [esError, setEsError] = useState(false); 
  const [ultimo, setUltimo] = useState(null);    
  const [contador, setContador] = useState(0);
  const formatear = (n) => '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const registrar = () => {
    if (estudiante.trim() === '') {
      setEsError(true);
      setMensaje('Debe ingresar el nombre del estudiante');
      return;
    }
    if (curso.trim() === '') {
      setEsError(true);
      setMensaje('Debe ingresar un curso');
      return;
    }

    if (!/^\d+$/.test(cupos.trim()) || Number(cupos) <= 0) {
      setEsError(true);
      setMensaje('Ingrese una cantidad válida');
      return;
    }

    const precioNum = Number(precio.trim());
    if (precio.trim() === '' || Number.isNaN(precioNum) || precioNum < 0) {
      setEsError(true);
      setMensaje('Ingrese un precio válido');
      return;
    }

    const cuposNum = Number(cupos);
    const total = cuposNum * precioNum;

    setUltimo({
      estudiante: estudiante.trim(),
      curso: curso.trim(),
      cupos: cuposNum,
      total,
    });
    setContador(contador + 1);
    setEsError(false);
    setMensaje('Inscripción registrada correctamente');
  };

  const limpiar = () => {
    setEstudiante('');
    setCurso('');
    setCupos('');
    setPrecio('');
    setMensaje('');
    setEsError(false);
    setUltimo(null);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Academia CodeNova</Text>
      <Text style={styles.bienvenida}>Bienvenido, registra tus inscripciones aquí</Text>

      <Text style={styles.etiqueta}>Nombre del estudiante</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Laura Gómez"
        value={estudiante}
        onChangeText={setEstudiante}
      />

      <Text style={styles.etiqueta}>Curso</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Python básico"
        value={curso}
        onChangeText={setCurso}
      />

      <Text style={styles.etiqueta}>Cupos (número de unidades)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 2"
        value={cupos}
        onChangeText={setCupos}
        keyboardType="numeric"
      />

      <Text style={styles.etiqueta}>Precio por cupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 3000"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <View style={styles.botones}>
        <Button title="Registrar inscripción" color="#2e7d32" onPress={registrar} />
        <View style={{ height: 8 }} />
        <Button title="Limpiar" color="#757575" onPress={limpiar} />
      </View>

      {mensaje !== '' && (
        <Text style={[styles.mensaje, esError ? styles.error : styles.ok]}>{mensaje}</Text>
      )}

      {ultimo && !esError && (
        <View style={styles.resumen}>
          <Text>Estudiante: {ultimo.estudiante}</Text>
          <Text>Curso: {ultimo.curso}</Text>
          <Text>Cupos: {ultimo.cupos}</Text>
          <Text style={styles.total}>Total: {formatear(ultimo.total)}</Text>
        </View>
      )}

      <Text style={styles.contador}>Inscripciones válidas: {contador}</Text>
    </View>
  );
}

// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f1f8e9', padding: 20, paddingTop: 60 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1b5e20', textAlign: 'center' },
  bienvenida: { textAlign: 'center', marginBottom: 16, color: '#444' },
  etiqueta: { fontWeight: '600', marginTop: 8, marginBottom: 2 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 8,
  },
  botones: { marginTop: 16 },
  mensaje: { marginTop: 12, fontWeight: 'bold', textAlign: 'center' },
  error: { color: '#c62828' },
  ok: { color: '#2e7d32' },
  resumen: { backgroundColor: '#fff', padding: 12, borderRadius: 6, marginTop: 10 },
  total: { fontWeight: 'bold', marginTop: 4 },
  contador: { marginTop: 16, textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});