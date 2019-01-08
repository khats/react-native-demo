import React, {Component} from 'react';
import {Image, FlatList, StyleSheet, Button, Alert, Text, TextInput, View} from 'react-native';

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            filteredData: [],
            dataSource: []
        };
    }

    componentDidMount() {
        return this.loadUsers();
    }

    loadUsers = () => {
        return fetch(`https://api.dating.com/users?filter=photos&gender=fem&maxage=35&minage=20&omit=${this.state.dataSource.length}&preferences.gender=mal&q=1&seed=3&select=15&sort=7`)
            .then((response) => response.json())
            .then((responseJson) => {
                let data = this.state.dataSource.map(x => Object.assign({}, x));

                responseJson.forEach(targetItem => {
                    if (data.every(sourceItem => sourceItem.id !== targetItem.id)) {
                        data.unshift(targetItem);
                    }
                });

                this.setState({
                    filteredData: data.filter(item => item.name.includes(this.state.filter)),
                    dataSource: data
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    filterData = (text) => {
        this.setState({
            filter: text,
            filteredData: this.state.dataSource.filter(item => item.name.includes(text))
        });
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={styles.container}>
                <Button on onPress={this.loadUsers} title={"Load more profiles"}/>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to filter"
                    onChangeText={(text) => this.filterData(text)}
                />
                <View>
                    <FlatList
                        data={this.state.filteredData}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) =>
                            <View style={{padding: 5}}>
                                <Text style={{fontSize: 18}}>{item.name}</Text>
                                <Image source={{
                                    uri: `https://api.dating.com/users/${item.id}/photos/${item.thumbnail}.215x180.thumb-fd`
                                }} style={{width: 215, height: 180}}/>
                            </View>}
                    />
                </View>
            </View>
        )
    }

}


const
    styles = StyleSheet.create({
        container: {
            padding: 30
        }
    })