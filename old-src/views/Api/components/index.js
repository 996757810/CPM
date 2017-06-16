/**
 * Created by cjy on 16/11/23.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    AsyncStorage,
    AlertIOS,
    ActionSheetIOS,
    AppState,
    StatusBarIOS,
    NetInfo,
    Image,
    CameraRoll,
    VibrationIOS,
} from 'react-native';
import Camera from 'react-native-camera';
import Geolocation from 'Geolocation';
import {color} from '../../../style/vars';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            photo: 'http://baidu.com',
            cameraType: Camera.constants.Type.back
        }
    }

    componentDidMount() {
        StatusBarIOS._nativeModule.setHidden(true, true)
    }

    render() {
        const props = this.props;
        const state = this.state;
        const photo = state.photo;
        console.log(photo)
        return (
            <ScrollView style={styles.box}>
                <Camera
                    ref="cam"
                    onBarCodeRead={this._onBarCodeRead.bind(this)}
                    type={this.state.cameraType}
                >
                    <Text>welcome to react-native</Text>
                    <Text>大撒撒</Text>
                    <TouchableOpacity onPress={this._switchCamera.bind(this)}>
                        <Text>The old switchCamera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._takePicker.bind(this)}>
                        <Text>The old takePicker</Text>
                    </TouchableOpacity>
                </Camera>
                {/*<ScrollView>*/}
                {/*<Image*/}
                {/*style={{width: 400, height: 700}}*/}
                {/*resizeMethod={'resize'}*/}
                {/*source={{uri: photo}}*/}
                {/*/>*/}
                {/*</ScrollView>*/}
                <TouchableOpacity onPress={this.alert}>
                    <Text>
                        AlertIOS alert
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.confirm}>
                    <Text>
                        AlertIOS prompt
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.action}>
                    <Text>
                        ActionSheetIOS ActionSheet
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.share}>
                    <Text>
                        ActionSheetIOS ShareSheet
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.saveImage.bind(this)}>
                    <Text>
                        保存图片
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.vibration}>
                    <Text>
                        震动一下
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.getPosition}>
                    <Text>
                        获取位置
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    getPosition(){
        Geolocation.getCurrentPosition(data => alert(JSON.stringify(data)), alert)
    }

    vibration(){
        VibrationIOS.vibrate();
    }

    _onBarCodeRead(e) {
        console.log(e);
    }

    _switchCamera() {
        const {back, front} = Camera.constants.Type;
        console.log(Camera)
        this.setState(({cameraType}) => ({
            cameraType: cameraType === back ? front : back
    }))
    }

    _takePicker() {
        this.refs.cam.capture((err, data) => {
            console.log(err, data)
        })
    }

    saveImage() {
        const imgUrl = 'http://vczero.github.io/lvtu/img/';

        CameraRoll.getPhotos({first: 5, groupTypes: 'All', assetType: 'Photos'}).then(data => {
            this.setState({
                photo: data.edges[0].node.image.uri
            })
        })
    }

    action() {
        NetInfo.addEventListener('change', isConnected => alert(isConnected))
        ActionSheetIOS.showActionSheetWithOptions({
            options: [
                '拨打电话',
                '发送邮件',
                '发送短信',
                '取消',
            ],
            cancelButtonIndex: 3,
            destructiveButtonIndex: 0,
            title: 'ActionSheetIOS',
            message: 'test'
        }, index => {
            alert(index)
        })
    }

    share() {
        ActionSheetIOS.showShareActionSheetWithOptions({
            url: 'https://weibo.com',
            message: 'weibo',
            subject: 'weibo主页'
        }, alert, alert)
    }

    alert() {
        console.log(AppState.currentState);
        AlertIOS.alert('title', 'content', [
            {
                text: 'ok',
                onPress: () => {
                    alert('你点击了ok')
                }
            },
            {
                text: 'no',
                onPress: () => {
                    alert('你点击了no')
                }
            }
        ])
    }

    confirm() {
        AlertIOS.prompt('title', 'content', [
            {
                text: 'ok',
                onPress: () => {
                    alert('你点击了ok')
                },
                style: 'cancel'
            },
            {
                text: 'no',
                onPress: () => {
                    alert('你点击了no')
                }
            }
        ])
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        paddingTop: 50
    }
});