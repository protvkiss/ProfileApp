import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from '../context/ThemeContext';

const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Name is required'),
  bio: Yup.string()
    .max(150, 'Bio is too long!')
    .required('Bio is required'),
});

const EditProfileScreen = ({ navigation, user, setUser }) => {
  const { colors } = useContext(ThemeContext);

  const handleSave = (values) => {
    setUser({ ...user, name: values.name, bio: values.bio });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Formik
          initialValues={{ name: user.name, bio: user.bio }}
          validationSchema={EditProfileSchema}
          onSubmit={handleSave}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={[styles.formContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              
              <Text style={[styles.label, { color: colors.text }]}>Name</Text>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  touched.name && errors.name && { borderColor: colors.error }
                ]}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
              {touched.name && errors.name && (
                <Text style={[styles.errorText, { color: colors.error }]}>{errors.name}</Text>
              )}

              <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
              <TextInput
                style={[
                  styles.input, 
                  styles.textArea,
                  { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  touched.bio && errors.bio && { borderColor: colors.error }
                ]}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                placeholder="Enter a short bio"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
              {touched.bio && errors.bio && (
                <Text style={[styles.errorText, { color: colors.error }]}>{errors.bio}</Text>
              )}

              <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Save Profile</Text>
              </TouchableOpacity>
              
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;
