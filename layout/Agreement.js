import React, { Component } from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { WebView, Platform } from 'react-native';
import Pdf from 'react-native-pdf';
import { CustomContainer } from '../components/CustomSnippets';


export default class Document extends Component {
  render({ navigation } = this.props) {
    console.log(this.props.navigation.getParam('link'));

    const pdfViewer =
      Platform.OS === 'ios' ? (
        <WebView
          source={{ uri: this.props.navigation.getParam('link') }} //'https://google.com'
          style={{ marginTop: 20 }}
        />
      ) : (
        <Pdf
        source={{uri: this.props.navigation.getParam('link'),cache:true}}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
      );
    return (
      <CustomContainer
        title={this.props.navigation.getParam('name')}
        navigationAction={() => navigation.goBack()}
        icon="arrow-back"
      >
        {pdfViewer}
      </CustomContainer>
    );
  }
}
