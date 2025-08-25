import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="movies" options={{
				title: 'movies'
			}} />
			<Tabs.Screen name="settings" options={{ title: 'settings' }} />
		</Tabs>
	)
}
