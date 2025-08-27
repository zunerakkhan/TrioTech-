public class day2 {
       public static void main(String[] args) {
        int[] marks = {22, 92, 88, 54, 85, 56, 99};
        int highestMark = 0;

        for (int i = 0; i < marks.length; i++) {
            if (marks[i] > highestMark) {
                highestMark = marks[i];
            }
        }

        System.out.println(highestMark);
    }
}
