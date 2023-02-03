import {db} from "./db";
import {useLiveQuery} from "dexie-react-hooks";

export function FriendList({minAge, maxAge}) {
    const friends = useLiveQuery(
      async () => {
        //
        // Query Dexie's API
        //
        const friends = await db.friends
          .where('age')
          .between(minAge, maxAge)
          .toArray();
  
        // Return result
        return friends;
      },
      // specify vars that affect query:
      [minAge, maxAge] 
    );
  
    return <ul>
      {friends?.map(friend => <li key={friend.id}>
        {friend.name}, {friend.age}
      </li>)}
    </ul>;
  }