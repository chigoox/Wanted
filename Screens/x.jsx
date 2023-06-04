<View style={tw`h-52 w-[90%] bg-[#${color[0]}] p-2 m-auto rounded`}>
    <View style={tw`bg-[#${color[4]}] relative overflow-hidden rounded-3xl w-[90%] h-12 mx-auto`}>
        <View style={tw`bg-[#${color[2]}] h-full w-[50%] relative`}>
            <View style={tw`flex-row justify-center items-center  bg-black h-[80%] top-1 left-2 absolute w-72 m-auto rounded-3xl`}>
                <Text style={tw`text-white font-bold`}>Name</Text>
            </View>
        </View>
    </View>
    <StyledView style={tw`flex-row gap-4 mx-4 my-2`} className={'gap-4'}>
        <View style={tw`rounded-full h-20 w-20 bg-[#${color[2]}]`}>

        </View>
        <StyledView className={''} style={tw`flex-row`} >
            <StyledView style={tw`w-20`} className={'gap-2'}>
                <Text style={tw`font-bold text-[#${color[2]}]`}>Gold</Text>
                <Text style={tw`font-bold text-[#${color[4]}]`}>LV</Text>
                <Text style={tw`font-bold text-[#${color[2]}]`}>Daily Tasks</Text>
            </StyledView>
            <StyledView style={tw``} className={'gap-2'}>
                <Text style={tw`font-bold text-[#${color[2]}]`}>1234</Text>
                <Text style={tw`font-bold text-[#${color[4]}]`}>26</Text>
                <Text style={tw`font-bold text-[#${color[2]}]`}>3/5</Text>
            </StyledView>
        </StyledView>
    </StyledView>


    <View style={tw`bg-[#${color[1]}] h-6 w-24 absolute bottom-0 rounded right-0`}>
        <Text style={tw`m-auto`}>Date</Text>
    </View>
</View>