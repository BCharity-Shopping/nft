import * as React from 'react';

export default class ScrollTab extends React.Component {
  onScroll = (event) => {
    const {navigation} = this.props;
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);

    if (dif < 0) {
      navigation.setParams({showTabBar: true});
    } else {
      navigation.setParams({showTabBar: false});
    }
    //console.log('dif=',dif);

    this.offset = currentOffset;
  };

  render() {
    return (
      <ScrollView onScroll={(e) => this.onScroll(e)}>
        {this.props.children}
      </ScrollView>
    );
  }
}
